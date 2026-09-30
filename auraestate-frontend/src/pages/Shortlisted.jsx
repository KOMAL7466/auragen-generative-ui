import { useState } from "react";

import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";

import {
  getProperties,
  getStoredItems,
} from "../services/api";

export default function Shortlisted() {
  const [shortlistedIds, setShortlistedIds] =
    useState(() => getStoredItems("shortlisted"));

  const properties = getProperties().filter(
    (property) =>
      shortlistedIds.some(
        (id) =>
          String(id) === String(property.id)
      )
  );

  /* =========================
     HANDLE SHORTLIST CHANGE
  ========================= */

  const handleShortlistChange = (
    propertyId,
    isShortlisted
  ) => {
    setShortlistedIds((current) => {
      if (isShortlisted) {
        if (
          current.some(
            (id) =>
              String(id) ===
              String(propertyId)
          )
        ) {
          return current;
        }

        return [
          ...current,
          String(propertyId),
        ];
      }

      return current.filter(
        (id) =>
          String(id) !==
          String(propertyId)
      );
    });
  };

  return (
    <>
      <Navbar />

      <main className="page-container">

        {/* HEADER */}

        <div className="page-header">

          <p className="small-label">
            YOUR PICKS
          </p>

          <h1>
            Shortlisted Properties
          </h1>

          <p>
            Properties you're seriously
            considering.
          </p>

        </div>


        {/* PROPERTY LIST */}

        {properties.length > 0 ? (

          <>

            <div
              className="shortlist-summary"
              style={{
                marginBottom: "24px",
              }}
            >
              <strong>
                {properties.length}
              </strong>{" "}
              {properties.length === 1
                ? "property"
                : "properties"}{" "}
              shortlisted
            </div>

            <div className="property-grid">

              {properties.map(
                (property) => (

                  <PropertyCard
                    key={property.id}
                    property={property}
                    onShortlistChange={
                      handleShortlistChange
                    }
                  />

                )
              )}

            </div>

          </>

        ) : (

          /* EMPTY STATE */

          <div className="empty-state">

            <h2>
              Your shortlist is empty
            </h2>

            <p>
              Add properties to your
              shortlist to compare them
              later.
            </p>

          </div>

        )}

      </main>
    </>
  );
}