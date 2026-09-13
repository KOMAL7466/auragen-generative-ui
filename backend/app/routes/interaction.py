from fastapi import APIRouter

from app.schemas.interaction import InteractionEvent
from app.services.cognitive_load import calculate_cognitive_load


router = APIRouter()


@router.post("/interaction/event")
def record_interaction(event: InteractionEvent):
    result = calculate_cognitive_load([event])

    return {
        "event": event,
        "cognitive_load": result
    }