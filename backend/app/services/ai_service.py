import json

from app.ai.llm import llm
from app.prompts.resume_prompt import build_resume_analysis_prompt, build_job_match_prompt

def analyze_resume(resume_text : str):
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