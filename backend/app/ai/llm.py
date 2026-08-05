from langchain_mistralai import ChatMistralAI
from app.core.config import settings

llm = ChatMistralAI(
    model="mistral-small-latest",
    api_key=settings.MISTRAL_API_KEY,
    temperature=0.2,
    max_tokens=1500
)