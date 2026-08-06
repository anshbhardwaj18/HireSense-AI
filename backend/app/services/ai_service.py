import json
import hashlib

from app.ai.llm import llm
from app.prompts.resume_prompt import build_resume_analysis_prompt, build_job_match_prompt
from app.redis.cache import get_cache, set_cache

def analyze_resume(resume_text : str):
    resume_hash = hashlib.md5(
        resume_text.encode()
    ).hexdigest()

    cache_key = f"resume_analysis:{resume_hash}"

    cached_result = get_cache(cache_key)
    if cached_result:
        return cached_result
    prompt = build_resume_analysis_prompt(resume_text)
    response = llm.invoke(prompt)
    ai_response = response.content
    try:
        result = json.loads(ai_response)
    except json.JSONDecodeError:
        result = {
            "error" : "AI response was not valid JSON.",
            "raw_respone": ai_response
        }
    set_cache(
        cache_key,
        result,
        expire=3600
    )
    return result

def analyze_job_match(
        resume_text: str,
        job_descripiton: str
):
    prompt = build_job_match_prompt(
        resume_text,
        job_descripiton
    )  
    response = llm.invoke(prompt)

    ai_response = response.content

    try:
        return json.loads(ai_response)
    except json.JSONDecodeError:
        return {
            "error": "AI response was not valid JSON",
            "raw_response": ai_response
        }