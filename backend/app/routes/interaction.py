from fastapi import APIRouter

from app.schemas.interaction import InteractionEvent
from app.services.cognitive_load import (
    add_event_to_session,
    calculate_cognitive_load,
    session_events,
)
from app.services.adaptive_ui import get_adaptive_ui_action


router = APIRouter()


@router.post("/interaction/event")
def record_interaction(event: InteractionEvent):
    # Add event to session memory
    all_events = add_event_to_session(event)

    # Calculate cumulative cognitive load
    load = calculate_cognitive_load(all_events)

    # Get adaptive UI action based on load level
    ui_action = get_adaptive_ui_action(load["level"])

    return {
        "event": event,
        "session_total_events": len(all_events),
        "cognitive_load": load,
        "adaptive_ui": ui_action
    }


@router.get("/cognitive-load/{session_id}")
def get_session_load(session_id: str):
    """
    Get current cognitive load and adaptive UI action for a session.
    Frontend isse poll kar sakti hai current state ke liye.
    """
    if session_id not in session_events:
        return {
            "session_id": session_id,
            "cognitive_load": {"score": 0, "level": "LOW", "total_events": 0},
            "adaptive_ui": get_adaptive_ui_action("LOW")
        }

    events = session_events[session_id]
    load = calculate_cognitive_load(events)
    ui_action = get_adaptive_ui_action(load["level"])

    return {
        "session_id": session_id,
        "cognitive_load": load,
        "adaptive_ui": ui_action
    }