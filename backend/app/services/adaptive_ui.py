def get_adaptive_ui_action(level):
    """
    Given a cognitive load level, return what the UI should do.
    """

    if level == "LOW":
        return {
            "ui_action": "normal",
            "show_help": False,
            "collapse_advanced": False,
            "highlight_important": False,
            "message": None
        }

    elif level == "MEDIUM":
        return {
            "ui_action": "simplify",
            "show_help": True,
            "collapse_advanced": False,
            "highlight_important": True,
            "message": "Need help? We can explain this in simpler terms."
        }

    elif level == "HIGH":
        return {
            "ui_action": "guide",
            "show_help": True,
            "collapse_advanced": True,
            "highlight_important": True,
            "message": "Let's simplify. Focus on the highlighted field first."
        }

    else:
        return {
            "ui_action": "unknown",
            "show_help": False,
            "collapse_advanced": False,
            "highlight_important": False,
            "message": None
        }