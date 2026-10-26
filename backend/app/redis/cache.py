import json
import logging
import redis

from app.redis.connection import redis_client

logger = logging.getLogger(__name__)


def set_cache(
        key: str,
        value: dict,
        expire: int = 3600
):
    try:
        redis_client.set(
            key,
            json.dumps(value),
            ex=expire
        )
    except (redis.RedisError, Exception) as e:
        logger.warning(f"Redis cache set failed for key {key}: {e}")


def get_cache(key: str):
    try:
        data = redis_client.get(key)
        if data:
            return json.loads(data)
    except (redis.RedisError, Exception) as e:
        logger.warning(f"Redis cache get failed for key {key}: {e}")
    return None