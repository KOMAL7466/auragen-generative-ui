import {
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Phone,
  Mail,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
} from "lucide-react";
import Navbar from "../components/Navbar";
import {
  getPropertyById,
  getStoredItems,
  toggleStoredItem,
  setStoredItems,
} from "../services/api";
import { trackInteraction } from "../services/interactionService";
import { useState } from "react";

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = getPropertyById(id);

  const [saved, setSaved] = useState(
    getStoredItems("saved").includes(id)
  );

  if (!property) {
    return (
      <>
        <Navbar />
        <div className="empty-state">
          <h2>Property not found</h2>
          <button
            className="primary-btn small"
            onClick={() => navigate("/properties")}
          >
            Back to Properties
          </button>
        </div>
      </>
    );
  }

  const save = () => {
    const updated = toggleStoredItem("saved", id);
    setSaved(updated.includes(id));
  };

  const enquiry = () => {
    const enquiries = JSON.parse(
      localStorage.getItem(
        "auraestate_enquiries"
      ) || "[]"
    );

    const newEnquiry = {
      id: Date.now().toString(),
      propertyId: id,
      propertyTitle: property.title,
      date: new Date().toISOString(),
      status: "New",
    };

    localStorage.setItem(
      "auraestate_enquiries",
      JSON.stringify([
        ...enquiries,
        newEnquiry,
      ])
    );

    trackInteraction("enquiry", {
      propertyId: id,
    });

    alert("Enquiry submitted successfully!");
  };

  const recent = getStoredItems("recentlyViewed");

  if (!recent.includes(id)) {
    setStoredItems(
      "recentlyViewed",
      [id, ...recent].slice(0, 10)
    );
  }

  return (
    <>
      <Navbar />

      <main className="page-container">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <section className="detail-page">
          <div className="detail-image">
            <img
              src={property.image}
              alt={property.title}
            />
          </div>

          <div className="detail-content">
            <div className="detail-top">
              <span className="property-type">
                {property.type}
              </span>

              <button
                className={
                  saved
                    ? "round-action active"
                    : "round-action"
                }
                onClick={save}
              >
                <Heart
                  size={20}
                  fill={
                    saved
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            </div>

            <h1>{property.title}</h1>

            <p className="location">
              <MapPin size={17} />
              {property.location}
            </p>

            <h2 className="detail-price">
              ₹
              {(
                property.price / 10000000
              ).toFixed(2)}{" "}
              Cr
            </h2>

            <div className="detail-stats">
              <div>
                <BedDouble />
                <strong>
                  {property.beds}
                </strong>
                <span>Bedrooms</span>
              </div>

              <div>
                <Bath />
                <strong>
                  {property.baths}
                </strong>
                <span>Bathrooms</span>
              </div>

              <div>
                <Maximize />
                <strong>
                  {property.area}
                </strong>
                <span>Sq.ft</span>
              </div>
            </div>

            <p className="description">
              This beautiful property offers modern
              living spaces, premium finishes and
              convenient access to major locations.
              Explore the property and connect with
              our team for more information.
            </p>

            <div className="detail-actions">
              <button
                className="primary-btn"
                onClick={enquiry}
              >
                <Mail size={18} />
                Send Enquiry
              </button>

              <button className="secondary-btn">
                <Phone size={18} />
                Contact Agent
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}