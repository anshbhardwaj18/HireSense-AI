from app.services.ai_service import _parse_json_response


def test_parse_clean_json():
    raw = '{"score": 85, "skills": ["Python", "Docker"]}'
    parsed = _parse_json_response(raw)
    assert parsed["score"] == 85
    assert "Python" in parsed["skills"]


def test_parse_json_with_markdown_fences():
    raw = '```json\n{"score": 90, "skills": ["FastAPI"]}\n```'
    parsed = _parse_json_response(raw)
    assert parsed["score"] == 90
    assert "FastAPI" in parsed["skills"]


def test_parse_json_with_surrounding_text():
    raw = 'Here is the analysis:\n{"score": 75, "skills": ["React"]}\nHope this helps!'
    parsed = _parse_json_response(raw)
    assert parsed["score"] == 75
    assert "React" in parsed["skills"]


def test_parse_invalid_json_fallback():
    raw = 'This is completely unparseable text without any json.'
    parsed = _parse_json_response(raw)
    assert "error" in parsed
    assert parsed["raw_response"] == raw
