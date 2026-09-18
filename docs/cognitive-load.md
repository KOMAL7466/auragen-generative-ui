## AuraGen - Cognitive Load Engine

## 1 Purpose
The Cognitve Load Engine is the core innovation of AuraGen. It detects when a user is struggling with complex interactions and helps before they give up. 

# Note - it's not a Chaboat. it observes behavious,not questions. 

## 2 Signal we Track 
| Signal | Weight | Meaning |
|---|---|---|
| validation_error | +20 | User's input was rejected |
| help_request | +20 | User explicitly asked for help |
| repeated_click | +15 | User clicked same element multiple times |
| section_revisit | +10 | User came back to a section |
| back_navigation | +10 | User went back |
| long_inactivity | +10 | User paused for a long time |

## 3. Score Calculation

```python
# def calculate_cognitive_load(events):
#     score = 0
#     for event in events:
#         if event.event_type == "validation_error":
#             score += 20
#         elif event.event_type == "repeated_click":
#             score += 15
#         elif event.event_type == "help_request":
#             score += 20
#         elif event.event_type == "section_revisit":
#             score += 10
#         elif event.event_type == "back_navigation":
#             score += 10
#         elif event.event_type == "long_inactivity":
#             score += 10

#     if score <= 30:
#         level = "LOW"
#     elif score <= 60:
#         level = "MEDIUM"
#     else:
#         level = "HIGH"

#     return {"score": score, "level": level, "total_events": len(events)}

## 4 Levels 
Low (Score 0 - 30 )
User is intreacting Normally 
no intervention needed 
Full UI shown 

2. Medium (Score 31-60)
User may be experiencing Difficylty
UI action: Simplify
# Action:
shown help Button 
highlight important fields
Display contextual message

HIGH(Score 61+)
User is clearly Struggling
UI action:Guide
collapse advanced info 
show help
Highlight key filed
Direct guidance message

## Session Management
Each user has a Unique Session_id. All events during a session are tracked cumulatively.
Becasue:
Cumulative Scoring(Mumltiple events = Higher score)
session isolation - different users don't affet each other 
Real time tracking 
6. Example Flow
text
Event 1: validation_error → score 20 → LOW
Event 2: help_request     → score 40 → MEDIUM  (adapt UI)
Event 3: repeated_click   → score 55 → MEDIUM
Event 4: section_revisit  → score 65 → HIGH    (guide mode)
7. Adaptive UI Response
The engine returns this object:

json
{
  "ui_action": "guide",
  "show_help": true,
  "collapse_advanced": true,
  "highlight_important": true,
  "message": "Let's simplify. Focus on the highlighted field first."
}
8. Testing
Test 1 — Cumulative Scoring (session demo1):

Event	Score	Level
validation_error	20	LOW
help_request	40	MEDIUM
repeated_click	55	MEDIUM
section_revisit	65	HIGH
Test 2 — Session Isolation (session demo2):

Fresh session → score 20, LOW

9. Current Limitations
In-memory storage: Data lost on server restart

Fixed weights: Not yet tuned on real user data

Simple thresholds: May need adjustment based on real usage

10. Future Improvements
Move session storage to PostgreSQL

Add ML model to learn weights from real data

Add more event types (mouse movement, scroll patterns)

Add per-user personalization

Add time-decay (old events weigh less)

