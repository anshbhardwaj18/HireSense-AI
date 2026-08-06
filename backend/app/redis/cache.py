import json

from app.redis.connection import redis_client

def set_cache(
        key: str,
        value: dict,
        expire: int = 3600
):
    redis_client.set(
        key,
        json.dumps(value),
        ex=expire
    )

def get_cache(key: str):
    data = redis_client.get(key)

    if data:
        return json.loads(data)

    return None