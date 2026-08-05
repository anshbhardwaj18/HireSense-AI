def build_resume_analysis_prompt(
        resume_text: str
) -> str:
    return f"""
You are an expert ATS Resume Reviewer and Senior Technical Recruiter.

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
    "suggestions": [],
    "recommended_roles": [],
    "interview_question": [],
    "skill_gep": []
}}

Resume:
{resume_text}
"""

def build_job_match_prompt(
        resume_text: str,
        job_descripiton: str
)-> str:
    return f"""
You are an expert Technical Recuriter and Job Matching AI.

Compare the cadidate resume with the given job descripiton.

Analyze:
- Skill match
- Experience match
- Missing skills
- Suitability of the role

Return ONLY valid JSON.

DO not write markdown.
Do not write explanation.
Do not wrap JSON inside ```.

Return this exact format:
{{
   "match_score": 0,
   "matched_skills": [],
   "missing_skills": [],
   "experience_match": "",
   "recommendation": "",
   "improvement_suggestions": []
}}

Resume:

{resume_text}

Job Description:

{job_descripiton}
"""