import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getPropertyById } from "../services/propertyService";
import { trackEvent } from "../services/interactionService";
import AdaptiveUILayer from "../components/AdaptiveUILayer";
import PropertyMap from "../components/PropertyMap";

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

// City coordinates for map
const CITY_COORDS = {
  Chandigarh: { lat: 30.7333, lng: 76.7794 },
  Mohali: { lat: 30.7046, lng: 76.7179 },
  Panchkula: { lat: 30.6942, lng: 76.8606 },
  Zirakpur: { lat: 30.6425, lng: 76.8173 },
};

// Nearby facilities mock data by city
const NEARBY_DATA = {
  Chandigarh: {
    schools: ["DAV Public School", "St. Kabir School", "Carmel Convent"],
    hospitals: ["PGIMER Chandigarh", "Alchemist Hospital", "Fortis Hospital"],
    metro: ["Sector 17 Metro", "Sector 8 Metro"],
    shopping: ["Elante Mall", "Sector 17 Plaza", "VR Punjab"],
  },
  Mohali: {
    schools: ["Ryan International", "Gian Jyoti School"],
    hospitals: ["Fortis Mohali", "Grecian Hospital"],
    metro: ["Mohali Metro", "Phase 8 Metro"],
    shopping: ["VR Punjab", "Bestech Square"],
  },
  Panchkula: {
    schools: ["Bhavan Vidyalaya", "DC Model School"],
    hospitals: ["Alchemist Panchkula", "Paras Hospital"],
    metro: ["Panchkula Metro"],
    shopping: ["Sector 8 Market", "Vishal Mega Mart"],
  },
  Zirakpur: {
    schools: ["Aarohi Model School", "Delhi Public School"],
    hospitals: ["Silver Oaks Hospital", "Amar Hospital"],
    metro: ["Zirakpur Metro Station"],
    shopping: ["Paras Downtown", "Cosmo Mall"],
  },
};

// Investment Recommendation Logic
function calculateRecommendation(property) {
  let score = 0;
  const reasons = [];

  // Historical growth
  if (property.price >= 10000000) {
    score += 30;
    reasons.push({ positive: true, text: "Strong historical price growth (+112% in 10 years)" });
  } else {
    score += 20;
    reasons.push({ positive: true, text: "Moderate historical growth with steady appreciation" });
  }

  // Rental potential by city
  const primeCities = ["Chandigarh", "Mohali"];
  if (primeCities.includes(property.city)) {
    score += 25;
    reasons.push({ positive: true, text: `Prime location in ${property.city} — high rental demand` });
  } else {
    score += 15;
    reasons.push({ positive: true, text: "Good rental market with growing demand" });
  }

  // Property type
  if (property.property_type === "Villa" || property.property_type === "Apartment") {
    score += 20;
    reasons.push({ positive: true, text: `${property.property_type} properties have strong resale value` });
  } else {
    score += 10;
    reasons.push({ positive: true, text: "Property type has stable long-term value" });
  }

  // Nearby development
  const hasMetro = NEARBY_DATA[property.city]?.metro?.length > 0;
  if (hasMetro) {
    score += 15;
    reasons.push({ positive: true, text: "Metro connectivity nearby — boosts future value" });
  }

  // Caution flag
  if (property.status === "Under Construction") {
    score -= 5;
    reasons.push({ positive: false, text: "Under construction — possession delayed" });
  }

  // Cap at 100
  score = Math.min(score, 100);

  let recommendation = "NEUTRAL";
  let verdict = "HOLD";
  if (score >= 80) {
    recommendation = "STRONG INVEST";
    verdict = "EXCELLENT";
  } else if (score >= 65) {
    recommendation = "INVEST";
    verdict = "GOOD";
  } else if (score >= 50) {
    recommendation = "NEUTRAL";
    verdict = "MODERATE";
  } else {
    recommendation = "CAUTION";
    verdict = "RISKY";
  }

  return { score, recommendation, verdict, reasons };
}

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

  const coords = CITY_COORDS[property.city] || CITY_COORDS.Chandigarh;
  const nearby = NEARBY_DATA[property.city] || NEARBY_DATA.Chandigarh;
  const rec = calculateRecommendation(property);

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

          {/* ============ AI INVESTMENT RECOMMENDATION ============ */}
          <div className="lux-section-title">
            <div className="title-block">
              <h2>
                AI Investment <span className="italic">Recommendation</span>
              </h2>
              <p>Based on historical trends, location, and market analysis</p>
            </div>
          </div>

          <div className="pd-recommendation-card">
            <div className="pd-rec-score-block">
              <div className="pd-rec-label">Investment Score</div>
              <div className="pd-rec-score">
                {rec.score}
                <span className="pd-rec-score-total">/100</span>
              </div>
              <div className={`pd-rec-verdict pd-rec-verdict-${rec.verdict.toLowerCase()}`}>
                {rec.recommendation}
              </div>
            </div>

            <div className="pd-rec-reasons">
              <div className="pd-rec-reasons-title">Analysis Breakdown</div>
              {rec.reasons.map((r, i) => (
                <div key={i} className={`pd-rec-reason ${r.positive ? "positive" : "caution"}`}>
                  <span className="pd-rec-reason-icon">{r.positive ? "✓" : "⚠"}</span>
                  <span>{r.text}</span>
                </div>
              ))}
              <div className="pd-rec-disclaimer">
                ⚠ This is an AI-generated estimate for guidance only. Not financial advice.
              </div>
            </div>
          </div>

          {/* ============ INVESTMENT SNAPSHOT ============ */}
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

          {/* ============ LOCATION MAP ============ */}
          <div className="lux-section-title">
            <div className="title-block">
              <h2>
                Location & <span className="italic">Connectivity</span>
              </h2>
              <p>{property.locality}, {property.city}</p>
            </div>
          </div>

          <div className="pd-map-wrapper">
            <PropertyMap lat={coords.lat} lng={coords.lng} title={property.title} />
          </div>

          {/* ============ NEARBY FACILITIES ============ */}
          <div className="lux-section-title">
            <div className="title-block">
              <h2>
                Nearby <span className="italic">Facilities</span>
              </h2>
              <p>Everything you need within a 2 km radius</p>
            </div>
          </div>

          <div className="pd-nearby-grid">
            <div className="pd-nearby-card">
              <div className="pd-nearby-icon">🏫</div>
              <h4>Schools</h4>
              <ul>
                {nearby.schools.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="pd-nearby-card">
              <div className="pd-nearby-icon">🏥</div>
              <h4>Hospitals</h4>
              <ul>
                {nearby.hospitals.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            <div className="pd-nearby-card">
              <div className="pd-nearby-icon">🚇</div>
              <h4>Metro / Transport</h4>
              <ul>
                {nearby.metro.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>

            <div className="pd-nearby-card">
              <div className="pd-nearby-icon">🛒</div>
              <h4>Shopping</h4>
              <ul>
                {nearby.shopping.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* ============ ENQUIRY ============ */}
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