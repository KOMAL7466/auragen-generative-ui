from fastapi import APIRouter

from app.schemas.interaction import InteractionEvent
from app.services.cognitive_load import (
    add_event_to_session,
    calculate_cognitive_load,
)


router = APIRouter()


@router.post("/interaction/event")
def record_interaction(event: InteractionEvent):
    # Add to session memory, get all events for this session
    all_events = add_event_to_session(event)

    # Calculate cumulative cognitive load
    result = calculate_cognitive_load(all_events)

    return {
        "event": event,
        "session_total_events": len(all_events),
        "cognitive_load": result
    }