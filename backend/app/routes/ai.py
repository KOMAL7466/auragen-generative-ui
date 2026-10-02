from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter()


class AdaptRequest(BaseModel):
    session_id: str
    page: str
    field: str | None = None
    question: str | None = None


def get_mock_response(page: str, question: str | None):
    """
    Mock LLM response for demo.
    Replace with real Gemini call in production.
    """
    
    # If user asked a specific question (chat mode)
    if question:
        q = question.lower()
        
        if "roi" in q or "return" in q:
            return {
                "response": "ROI (Return on Investment) is the profit you earn relative to the amount invested. For this property, historical appreciation is +112% over 10 years — roughly 7.8% annual return."
            }
        elif "investment horizon" in q:
            return {
                "response": "Investment horizon is the period you plan to hold the property before selling. Short-term is under 3 years, long-term is 7+ years. For real estate, a 5-10 year horizon typically yields the best appreciation."
            }
        elif "rental" in q or "rent" in q:
            return {
                "response": "This property's rental potential is strong — estimated ₹42,000/month in Chandigarh's Sector 17. That's about 4.4% annual rental yield on the current price."
            }
        elif "nearby" in q or "facilities" in q:
            return {
                "response": "Within 2 km you'll find DAV Public School, PGIMER hospital, Sector 17 Metro, and Elante Mall. The location is prime with excellent connectivity."
            }
        elif "compare" in q:
            return {
                "response": "To compare properties, focus on three factors: price per sqft, historical appreciation rate, and rental yield. I can help if you share the two property IDs."
            }
        else:
            return {
                "response": "That's a great question. For detailed analysis, please share the specific property you're looking at, or ask about ROI, rental yield, investment horizon, or nearby facilities."
            }
    
    # Page-level UI adaptation (for AdaptiveUILayer)
    return {
        "ui_action": "simplify",
        "hide_sections": ["advanced_metrics"],
        "highlight_fields": ["roi", "investment_horizon"],
        "guidance_text": "Focus on ROI first. Investment horizon is optional for now.",
        "layout": "compact",
        "response": "Based on the property data, this is a strong investment with +112% historical growth."
    }


@router.post("/ai/adapt")
def adapt_ui(data: AdaptRequest):
    """
    Returns LLM-based UI adaptation response.
    Currently uses mock logic — will integrate Gemini in production.
    """
    result = get_mock_response(data.page, data.question)
    return result