import Navbar from "../components/Navbar";
import {
  getProperties,
  getStoredItems,
  setStoredItems,
} from "../services/api";
import { X } from "lucide-react";

export default function Compare() {
  const ids = getStoredItems("compare");

  const properties = ids
    .map((id) =>
      getProperties().find(
        (property) => property.id === id
      )
    )
    .filter(Boolean);

  const remove = (id) => {
    setStoredItems(
      "compare",
      ids.filter((item) => item !== id)
    );

    window.location.reload();
  };

  return (
    <>
      <Navbar />

      <main className="page-container">
        <div className="page-header">
          <p className="small-label">
            DECISION SUPPORT
          </p>

          <h1>Compare Properties</h1>

          <p>
            Compare your selected properties
            side-by-side.
          </p>
        </div>

        {properties.length ? (
          <div className="compare-container">
            {properties.map((property) => (
              <div
                className="compare-card"
                key={property.id}
              >
                <button
                  className="remove-compare"
                  onClick={() =>
                    remove(property.id)
                  }
                >
                  <X size={17} />
                </button>

                <img
                  src={property.image}
                  alt={property.title}
                />

                <h3>{property.title}</h3>

                <p>{property.location}</p>

                <strong>
                  ₹
                  {(
                    property.price /
                    10000000
                  ).toFixed(2)}{" "}
                  Cr
                </strong>

                <div>
                  <span>
                    {property.beds} Bedrooms
                  </span>

                  <span>
                    {property.baths} Bathrooms
                  </span>

                  <span>
                    {property.area} sqft
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>Nothing to compare</h2>
            <p>
              Add properties to your comparison list
              from the property cards.
            </p>
          </div>
        )}
      </main>
    </>
  );
}