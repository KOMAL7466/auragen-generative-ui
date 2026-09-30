import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";
import {
  getProperties,
  getStoredItems,
} from "../services/api";

export default function Shortlisted() {
  const ids = getStoredItems("shortlisted");

  const properties = getProperties().filter(
    (property) => ids.includes(property.id)
  );

  return (
    <>
      <Navbar />

      <main className="page-container">
        <div className="page-header">
          <p className="small-label">YOUR PICKS</p>
          <h1>Shortlisted Properties</h1>
          <p>
            Properties you're seriously considering.
          </p>
        </div>

        {properties.length ? (
          <div className="property-grid">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>Your shortlist is empty</h2>
            <p>
              Add properties to your shortlist to
              compare them later.
            </p>
          </div>
        )}
      </main>
    </>
  );
}