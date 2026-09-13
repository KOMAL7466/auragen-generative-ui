from pydantic import BaseModel


class InteractionEvent(BaseModel):
    session_id: str
    event_type: str
    page: str
    field_name: str | None = None