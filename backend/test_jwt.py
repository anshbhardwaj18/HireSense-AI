from app.core.jwt import create_access_token, decode_access_token


token = create_access_token(
    {
        "sub": "ansh@example.com"
    }
)

print("TOKEN:")
print(token)


data = decode_access_token(token)

print("PAYLOAD:")
print(data)