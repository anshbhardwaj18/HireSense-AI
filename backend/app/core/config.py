from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

# Search for .env file in cwd, backend directory, or project root
_CURRENT_FILE = Path(__file__).resolve()
_BACKEND_DIR = _CURRENT_FILE.parents[2]
_REPO_ROOT = _CURRENT_FILE.parents[3] if len(_CURRENT_FILE.parents) > 3 else _BACKEND_DIR

_CANDIDATE_ENVS = [
    Path.cwd() / ".env",
    _BACKEND_DIR / ".env",
    _REPO_ROOT / ".env",
]
_ENV_FILE = next((p for p in _CANDIDATE_ENVS if p.is_file()), None)


class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    MISTRAL_API_KEY: str

    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    REDIS_DB: int = 0

    ALLOWED_ORIGINS: str = ""

    model_config = SettingsConfigDict(
        env_file=_ENV_FILE,
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()