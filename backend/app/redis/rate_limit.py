from fastapi import Request, HTTPException

from app.redis.connection import redis_client

def rate_limits(
        limit: int = 10,
        window: int = 60
):
    def limiter(request: Request):
        client_ip = request.client.host
        key = f"rate_limits:{client_ip}"

        current_count = redis_client.get(key)

        if current_count and int(current_count) >= limit:
            raise HTTPException(
                status_code=429,
                detail="Too many request. Please try again later."
            )

        pipe = redis_client.pipeline()

        pipe.incr(key)

        if not current_count:
            pipe.expire(
                key,
                window
            )
        pipe.execute()

    return limiter