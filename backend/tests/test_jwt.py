from app.core.jwt import create_access_token, decode_access_token, create_refresh_token, decode_refresh_token


def test_create_and_decode_access_token():
    payload = {"sub": "testuser@example.com"}
    token = create_access_token(payload)
    assert isinstance(token, str)

    decoded = decode_access_token(token)
    assert decoded is not None
    assert decoded.get("sub") == "testuser@example.com"
    assert "exp" in decoded


def test_decode_invalid_access_token():
    result = decode_access_token("invalid.token.signature")
    assert result is None


def test_create_and_decode_refresh_token():
    payload = {"sub": "refreshuser@example.com"}
    token = create_refresh_token(payload)
    assert isinstance(token, str)

    decoded = decode_refresh_token(token)
    assert decoded is not None
    assert decoded.get("sub") == "refreshuser@example.com"
    assert decoded.get("type") == "refresh"


def test_refresh_token_rejects_access_token():
    access_token = create_access_token({"sub": "user@example.com"})
    decoded = decode_refresh_token(access_token)
    assert decoded is None
