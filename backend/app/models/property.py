from sqlalchemy import Column, Integer, String, Text

from app.database.connection import Base


class Property(Base):
    __tablename__ = "properties"

    id = Column(
        String(50),
        primary_key=True
    )

    property_code = Column(
        String(50),
        unique=True,
        nullable=False,
        index=True
    )

    title = Column(
        String(200),
        nullable=False
    )

    property_type = Column(
        String(50),
        nullable=False
    )

    category = Column(
        String(50),
        nullable=False
    )

    price = Column(
        Integer,
        nullable=False
    )

    price_display = Column(
        String(50),
        nullable=False
    )

    area = Column(
        Integer,
        nullable=False
    )

    bedrooms = Column(
        Integer,
        nullable=False
    )

    bathrooms = Column(
        Integer,
        nullable=False
    )

    city = Column(
        String(100),
        nullable=False,
        index=True
    )

    locality = Column(
        String(150),
        nullable=False
    )

    status = Column(
        String(50),
        nullable=False
    )

    image_emoji = Column(
        String(20),
        nullable=True
    )

    description = Column(
        Text,
        nullable=True
    )