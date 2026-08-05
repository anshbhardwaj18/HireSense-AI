from mistralai.client import MistralClient

from app.core.config import settings


client = MistralClient(
    api_key=settings.MISTRAL_API_KEY
)

def generate_resume_analysis(
        prompt: str
)-> str:
    response = client.chat.complete(
        model="mistral-small-latest",
        message=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )
    return response.choices[0].message.content