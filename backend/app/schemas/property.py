from pydantic import BaseModel


class Property(BaseModel):
    id: str
    property_code: str
    title: str
    property_type: str
    category: str
    price: int
    price_display: str
    area: int
    bedrooms: int
    bathrooms: int
    city: str
    locality: str
    status: str
    image_emoji: str
    description: str