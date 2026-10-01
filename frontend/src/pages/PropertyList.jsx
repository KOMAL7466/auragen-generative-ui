import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAllProperties } from "../services/propertyService";
import { trackEvent } from "../services/interactionService";

const FALLBACK_IMGS = {
  Villa: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  Apartment: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  Plot: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
  Commercial: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
};

function PropertyList() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Residential", "Luxury", "Commercial", "Investment"];

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const data = await getAllProperties();
      setProperties(data.properties || []);
      setFiltered(data.properties || []);
    } catch (err) {
      console.error("Failed to load properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    if (filter === "All") {
      setFiltered(properties);
    } else {
      setFiltered(properties.filter((p) => p.category === filter));
    }
  };

  const handleView = (property) => {
    trackEvent("repeated_click", "property-list", property.property_code);
    navigate(`/property/${property.property_code}`);
  };

  return (
    <>
      <Navbar />
      <div className="user-page">
        <div className="user-page-header">
          <h1>Discover Properties</h1>
          <p>Handpicked premium listings with AI-powered insights</p>
        </div>

        <div className="filter-chips">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-chip ${activeFilter === f ? "active" : ""}`}
              onClick={() => handleFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-state">Loading properties...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">No properties found in this category</div>
        ) : (
          <div className="property-grid">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="property-card"
                onClick={() => handleView(p)}
              >
                <div className="property-card-thumb">
                  <img
                    src={FALLBACK_IMGS[p.property_type] || FALLBACK_IMGS.Villa}
                    alt={p.title}
                  />
                  <span className="property-badge">{p.category}</span>
                  <span className="property-code">{p.property_code}</span>
                </div>
                <div className="property-card-body">
                  <h3>{p.title}</h3>
                  <div className="property-card-loc">📍 {p.locality}, {p.city}</div>
                  <div className="property-card-price">{p.price_display}</div>
                  <div className="property-card-specs">
                    {p.bedrooms > 0 && <span>🛏 {p.bedrooms} Bed</span>}
                    {p.bathrooms > 0 && <span>🛁 {p.bathrooms} Bath</span>}
                    <span>📐 {p.area} sqft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default PropertyList;