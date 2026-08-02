from app.ai.mistral import generate_resume_analysis

response = generate_resume_analysis(
    "My name is Ansh bhardwaj. I know Python, FastAPI and PostgreSQL"
)
print(response)