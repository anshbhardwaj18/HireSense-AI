import logging
from fastapi import Request, HTTPException
import redis

from app.redis.connection import redis_client

logger = logging.getLogger(__name__)


def rate_limits(
        limit: int = 10,
        window: int = 60
):
    def limiter(request: Request):
        try:
            client_ip = request.client.host if request.client else "unknown"
            key = f"rate_limits:{client_ip}"

            current_count = redis_client.get(key)

            if current_count and int(current_count) >= limit:
                raise HTTPException(
                    status_code=429,
                    detail="Too many requests. Please try again later."
                )

            pipe = redis_client.pipeline()
            pipe.incr(key)

            if not current_count:
                pipe.expire(key, window)
            pipe.execute()
        except HTTPException:
            raise
        except (redis.RedisError, Exception) as e:
            # Gracefully allow traffic when Redis is unavailable
            logger.warning(f"Rate limiter failed to connect to Redis: {e}")

    return limiter