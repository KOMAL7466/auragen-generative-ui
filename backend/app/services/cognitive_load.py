def calculate_cognitive_load(events):
    score = 0

    for event in events:
        if event.event_type == "validation_error":
            score += 20
        elif event.event_type == "repeated_click":
            score += 15
        elif event.event_type == "help_request":
            score += 20
        elif event.event_type == "section_revisit":
            score += 10
        elif event.event_type == "back_navigation":
            score += 10
        elif event.event_type == "long_inactivity":
            score += 10

    if score <= 30:
        level = "LOW"
    elif score <= 60:
        level = "MEDIUM"
    else:
        level = "HIGH"

    return {
        "score": score,
        "level": level
    }