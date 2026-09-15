from fastapi import APIRouter, HTTPException

from app.services.properties_data import PROPERTIES


router = APIRouter()


@router.get("/properties")
def get_all_properties(city: str | None = None, category: str | None = None):
    """
    Get all properties with optional filters.
    """
    results = PROPERTIES

    if city:
        results = [p for p in results if p["city"].lower() == city.lower()]

    if category:
        results = [p for p in results if p["category"].lower() == category.lower()]

    return {
        "total": len(results),
        "properties": results
    }


@router.get("/properties/{property_id}")
def get_property(property_id: str):
    """
    Get a single property by ID or property_code.
    """
    for prop in PROPERTIES:
        if prop["id"] == property_id or prop["property_code"] == property_id:
            return prop

    raise HTTPException(status_code=404, detail="Property not found")