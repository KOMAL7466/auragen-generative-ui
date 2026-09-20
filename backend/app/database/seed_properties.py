from app.database.connection import SessionLocal
from app.models.property import Property
from app.services.properties_data import PROPERTIES


def seed_properties():
    db = SessionLocal()

    try:
        existing_count = db.query(Property).count()

        if existing_count > 0:
            print(f"Properties already exist: {existing_count}")
            return

        for data in PROPERTIES:
            property_obj = Property(**data)
            db.add(property_obj)

        db.commit()

        print(f"Successfully seeded {len(PROPERTIES)} properties.")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_properties()