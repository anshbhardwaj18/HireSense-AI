from app.ai.llm import llm

response = llm.invoke(
    "introduce yourself in one short sentences."
)
print(response.content)