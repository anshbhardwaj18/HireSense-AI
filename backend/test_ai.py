from app.ai.llm import llm

if __name__ == "__main__":
    response = llm.invoke(
        "introduce yourself in one short sentences."
    )
    print(response.content)