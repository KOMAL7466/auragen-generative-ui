import {
  Heart,
  GitCompare,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  getStoredItems,
  toggleStoredItem,
} from "../services/api";

import { trackInteraction } from "../services/interactionService";

import { useState } from "react";

const formatPrice = (price) => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }

  return `₹${(price / 100000).toFixed(1)} L`;
};

export default function PropertyCard({
  property,
  onShortlistChange,
}) {
  const [saved, setSaved] = useState(() =>
    getStoredItems("saved").some(
      (id) => String(id) === String(property.id)
    )
  );

  const [shortlisted, setShortlisted] = useState(() =>
    getStoredItems("shortlisted").some(
      (id) => String(id) === String(property.id)
    )
  );

  /* =========================
     SAVE PROPERTY
  ========================= */

  const save = () => {
    const updated = toggleStoredItem(
      "saved",
      property.id
    );

    const isSaved = updated.some(
      (id) => String(id) === String(property.id)
    );

    setSaved(isSaved);

    trackInteraction("save_property", {
      propertyId: property.id,
      saved: isSaved,
    });
  };

  /* =========================
     SHORTLIST PROPERTY
  ========================= */

  const shortlist = () => {
    const updated = toggleStoredItem(
      "shortlisted",
      property.id
    );

    const isShortlisted = updated.some(
      (id) => String(id) === String(property.id)
    );

    setShortlisted(isShortlisted);

    trackInteraction("shortlist_property", {
      propertyId: property.id,
      shortlisted: isShortlisted,
    });

    /*
      Tell parent page that shortlist changed.
      This makes the Shortlisted page update immediately.
    */
    if (onShortlistChange) {
      onShortlistChange(
        property.id,
        isShortlisted
      );
    }
  };

  return (
    <div className="property-card">

      {/* PROPERTY IMAGE */}

      <div className="property-image-wrapper">

        <img
          src={property.image}
          alt={property.title}
        />

        {property.featured && (
          <span className="featured-tag">
            Featured
          </span>
        )}

        <div className="property-actions">

          {/* SAVE */}

          <button
            type="button"
            aria-label="Save property"
            className={
              saved
                ? "icon-btn active"
                : "icon-btn"
            }
            onClick={save}
          >
            <Heart
              size={18}
              fill={
                saved
                  ? "currentColor"
                  : "none"
              }
            />
          </button>

          {/* SHORTLIST */}

          <button
            type="button"
            aria-label="Shortlist property"
            className={
              shortlisted
                ? "icon-btn active"
                : "icon-btn"
            }
            onClick={shortlist}
          >
            <GitCompare
              size={18}
            />
          </button>

        </div>
      </div>


      {/* PROPERTY CONTENT */}

      <div className="property-content">

        <span className="property-type">
          {property.type}
        </span>

        <h3>
          {property.title}
        </h3>

        <p className="location">
          <MapPin size={15} />
          {property.location}
        </p>

        <h2>
          {formatPrice(property.price)}
        </h2>

        <div className="property-details">

          <span>
            <BedDouble size={16} />
            {property.beds} Beds
          </span>

          <span>
            <Bath size={16} />
            {property.baths} Baths
          </span>

          <span>
            <Maximize size={16} />
            {property.area} sqft
          </span>

        </div>

        <Link
          to={`/properties/${property.id}`}
          className="view-property"
        >
          View Property
        </Link>

      </div>

    </div>
  );
}