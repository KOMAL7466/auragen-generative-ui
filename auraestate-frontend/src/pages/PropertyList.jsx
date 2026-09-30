import { Search, SlidersHorizontal } from "lucide-react";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";
import { getProperties } from "../services/api";

export default function PropertyList() {
  const properties = getProperties();

  return (
    <>
      <Navbar />

      <main className="properties-page">
        <div className="page-container">

          {/* HEADER */}
          <section className="page-header">
            <p className="small-label">EXPLORE PROPERTIES</p>

            <h1>Find your next home</h1>

            <p>
              Explore properties curated to help you make
              confident real-estate decisions.
            </p>
          </section>

          {/* SEARCH + FILTER */}
          <div className="property-toolbar">

            <div className="property-search">
              <Search size={19} />

              <input
                type="text"
                placeholder="Search by location or property type..."
              />
            </div>

            <button className="filter-btn">
              <SlidersHorizontal size={18} />
              Filters
            </button>

          </div>

          {/* PROPERTY COUNT */}
          <div className="property-results-header">
            <div>
              <span className="small-label">
                AVAILABLE PROPERTIES
              </span>

              <h2>{properties.length} Properties</h2>
            </div>
          </div>

          {/* PROPERTY GRID */}
          <section className="property-grid">

            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}

          </section>

        </div>
      </main>
    </>
  );
}