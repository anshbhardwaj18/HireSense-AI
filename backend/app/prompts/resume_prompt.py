def build_resume_analysis_prompt(
        resume_text: str
)-> str:
    return f"""
You are a expert ATS Resume Reviwer ans Senior Technical Recuriter.

Analyze the following resume carefully.

Return ONLY valid JSON.

Do not write markdown.
Do not write explanation.
Do not wrap JSON inside ```.

Return this exact format:

{{
    "score": 0,
    "summary": "",
    "skills": [],
    "missing_skills": [],
    "strengths": [],
    "suggestions": []
}}
Resume :
{resume_text}
"""