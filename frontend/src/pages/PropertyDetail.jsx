import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getPropertyById } from "../services/propertyService";
import { trackEvent } from "../services/interactionService";
import AdaptiveUILayer from "../components/AdaptiveUILayer";

const IMGS = {
  Villa: [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
  ],
  Apartment: [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&q=80",
  ],
  Plot: [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
    "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=1200&q=80",
  ],
  Commercial: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
  ],
};

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [enquiry, setEnquiry] = useState("");

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      const data = await getPropertyById(id);
      setProperty(data);
    } catch (err) {
      console.error("Failed to load property:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnquiry = () => {
    trackEvent("help_request", "property-detail", "enquiry");
    alert("Your enquiry has been recorded. Our team will reach out soon.");
    setEnquiry("");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-state">Loading property...</div>
      </>
    );
  }

  if (!property) {
    return (
      <>
        <Navbar />
        <div className="empty-state">Property not found</div>
      </>
    );
  }

  const images = IMGS[property.property_type] || IMGS.Villa;
  const historicalData = [
    { year: "2016", value: 40 },
    { year: "2018", value: 48 },
    { year: "2020", value: 55 },
    { year: "2022", value: 67 },
    { year: "2024", value: 76 },
    { year: "2026", value: 85 },
  ];

  return (
    <>
      <Navbar />

      <div className="user-page" style={{ paddingTop: "40px" }}>
        <AdaptiveUILayer page="property-detail" field="roi">
          <div className="pd-breadcrumb" onClick={() => navigate("/properties")}>
            ← Back to Properties
          </div>

          {/* Gallery + Info */}
          <div className="pd-main-grid">
            {/* Images */}
            <div>
              <div className="pd-gallery-main">
                <img src={images[activeImg]} alt={property.title} />
              </div>
              <div className="pd-thumbs">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className={`pd-thumb ${activeImg === i ? "active" : ""}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={img} alt="" />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <span className="pd-category-badge">{property.category}</span>
              <h1 className="pd-title">{property.title}</h1>
              <div className="pd-location">
                📍 {property.locality}, {property.city}
              </div>
              <div className="pd-price">{property.price_display}</div>
              <div className="pd-status">{property.status}</div>

              {/* Specs */}
              <div className="pd-specs-grid">
                <div>
                  <div className="pd-spec-label">Bedrooms</div>
                  <div className="pd-spec-value">{property.bedrooms || "—"}</div>
                </div>
                <div>
                  <div className="pd-spec-label">Bathrooms</div>
                  <div className="pd-spec-value">{property.bathrooms || "—"}</div>
                </div>
                <div>
                  <div className="pd-spec-label">Area</div>
                  <div className="pd-spec-value">{property.area} sqft</div>
                </div>
                <div>
                  <div className="pd-spec-label">Property ID</div>
                  <div className="pd-spec-value code">{property.property_code}</div>
                </div>
              </div>

              <div className="pd-actions">
                <button className="btn-primary">Save Property</button>
                <button className="btn-ghost-dark">Compare</button>
              </div>

              <p className="pd-description">{property.description}</p>
            </div>
          </div>

          {/* Investment Snapshot */}
          <div className="lux-section-title">
            <div className="title-block">
              <h2>
                Investment <span className="italic">Snapshot</span>
              </h2>
              <p>Historical value progression and future estimates</p>
            </div>
          </div>

          <div className="pd-investment-card">
            <div className="pd-history-grid">
              {historicalData.map((h, i) => (
                <div
                  key={i}
                  className={`pd-history-item ${
                    i === historicalData.length - 1 ? "current" : ""
                  }`}
                >
                  <div className="year">{h.year}</div>
                  <div className="value">₹{h.value}L</div>
                </div>
              ))}
            </div>

            <div className="pd-growth-insight">
              <strong>Growth Insight:</strong> This property has appreciated{" "}
              <strong>+112%</strong> in 10 years (~7.8% CAGR). Estimated 2030
              value: <strong>₹1.15 Cr</strong> · 2036 value:{" "}
              <strong>₹1.65 Cr</strong>.
              <em>⚠ Estimates only. Not guaranteed returns.</em>
            </div>
          </div>

          {/* Enquiry */}
          <div className="lux-section-title">
            <div className="title-block">
              <h2>
                Make an <span className="italic">enquiry</span>
              </h2>
              <p>Our team will get back within 24 hours</p>
            </div>
          </div>

          <div className="pd-enquiry-card">
            <textarea
              placeholder="Tell us what you'd like to know about this property..."
              value={enquiry}
              onChange={(e) => setEnquiry(e.target.value)}
            />
            <button className="btn-primary" onClick={handleEnquiry}>
              Submit Enquiry
            </button>
          </div>
        </AdaptiveUILayer>
      </div>
    </>
  );
}

export default PropertyDetail;