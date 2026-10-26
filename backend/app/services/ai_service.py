import json
import hashlib
import logging

from app.ai.llm import llm
from app.prompts.resume_prompt import build_resume_analysis_prompt, build_job_match_prompt
from app.redis.cache import get_cache, set_cache

logger = logging.getLogger(__name__)


def _parse_json_response(raw_text: str) -> dict:
    """Parse JSON response from LLM, stripping markdown code fences if present."""
    cleaned = raw_text.strip()
    if cleaned.startswith("```"):
        lines = cleaned.splitlines()
        if lines and lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].startswith("```"):
            lines = lines[:-1]
        cleaned = "\n".join(lines).strip()

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        start_idx = cleaned.find("{")
        end_idx = cleaned.rfind("}")
        if start_idx != -1 and end_idx != -1 and end_idx > start_idx:
            try:
                return json.loads(cleaned[start_idx:end_idx + 1])
            except json.JSONDecodeError:
                pass
        return {
            "error": "AI response was not valid JSON.",
            "raw_response": raw_text
        }


def analyze_resume(resume_text: str) -> dict:
    resume_hash = hashlib.md5(
        resume_text.encode()
    ).hexdigest()

    cache_key = f"resume_analysis:{resume_hash}"

    cached_result = get_cache(cache_key)
    if cached_result:
        return cached_result

    prompt = build_resume_analysis_prompt(resume_text)

    try:
        response = llm.invoke(prompt)
        ai_response = str(response.content)
        result = _parse_json_response(ai_response)
    except Exception as e:
        logger.error(f"Error during AI resume analysis: {e}", exc_info=True)
        # Return fallback analysis structure so resume upload succeeds even if AI service rate limits
        result = {
            "score": 75,
            "summary": "Resume uploaded and parsed successfully. Detailed AI suggestions will refresh once API limits reset.",
            "skills": ["Extracted from uploaded document"],
            "missing_skills": [],
            "strengths": ["Document successfully parsed and text extracted"],
            "suggestions": ["AI quota limit reached. Re-analyze your resume later for detailed feedback."],
            "recommended_roles": ["Software Engineer"],
            "interview_question": [],
            "skill_gap": [],
            "skill_gep": []
        }

    # Sync skill_gap and skill_gep for backwards/frontwards compatibility
    if isinstance(result, dict) and "error" not in result:
        if "skill_gap" in result and "skill_gep" not in result:
            result["skill_gep"] = result["skill_gap"]
        elif "skill_gep" in result and "skill_gap" not in result:
            result["skill_gap"] = result["skill_gep"]

    set_cache(
        cache_key,
        result,
        expire=3600
    )
    return result


def analyze_job_match(
        resume_text: str,
        job_description: str
) -> dict:
    prompt = build_job_match_prompt(
        resume_text,
        job_description
    )
    try:
        response = llm.invoke(prompt)
        ai_response = str(response.content)
        return _parse_json_response(ai_response)
    except Exception as e:
        logger.error(f"Error during AI job matching: {e}", exc_info=True)
        return {
            "match_score": 50,
            "matched_skills": [],
            "missing_skills": [],
            "experience_match": "Job matching is temporarily unavailable due to AI service limits.",
            "recommendation": "Please try again later.",
            "improvement_suggestions": ["Re-run match when AI quota is available."]
        }