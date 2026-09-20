from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.property import Property


router = APIRouter()


def property_to_dict(prop: Property):
    return {
        "id": prop.id,
        "property_code": prop.property_code,
        "title": prop.title,
        "property_type": prop.property_type,
        "category": prop.category,
        "price": prop.price,
        "price_display": prop.price_display,
        "area": prop.area,
        "bedrooms": prop.bedrooms,
        "bathrooms": prop.bathrooms,
        "city": prop.city,
        "locality": prop.locality,
        "status": prop.status,
        "image_emoji": prop.image_emoji,
        "description": prop.description,
    }


@router.get("/properties")
def get_all_properties(
    city: str | None = None,
    category: str | None = None,
    db: Session = Depends(get_db)
):
    """
    Get all properties from PostgreSQL with optional filters.
    """

    query = db.query(Property)

    if city:
        city = city.strip()
        query = query.filter(Property.city.ilike(city))

    if category:
        category = category.strip()
        query = query.filter(Property.category.ilike(category))

    properties = query.all()

    return {
        "total": len(properties),
        "properties": [
            property_to_dict(prop)
            for prop in properties
        ]
    }


@router.get("/properties/{property_id}")
def get_property(
    property_id: str,
    db: Session = Depends(get_db)
):
    """
    Get a single property by ID or property_code.
    """

    prop = (
        db.query(Property)
        .filter(
            (Property.id == property_id)
            | (Property.property_code == property_id)
        )
        .first()
    )

    if not prop:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )

    return property_to_dict(prop)