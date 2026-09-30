
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Brain,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";
import GuidanceBanner from "../components/GuidanceBanner";

import useCognitiveLoad from "../hooks/useCognitiveLoad";
import { getProperties, getCurrentUser } from "../services/api";

export default function Home() {
  const properties = getProperties();
  const user = getCurrentUser();
  const load = useCognitiveLoad();

  const featuredProperties = properties
    .filter((item) => item.featured)
    .slice(0, 3);

  return (
    <>
      <Navbar />

      <main className="home-page">

        {/* ================= HERO ================= */}

        <section className="hero-section">

          {/* LEFT SIDE */}

          <div className="hero-content">

            <span className="eyebrow">
              <Sparkles size={15} />
              AI-ADAPTIVE REAL ESTATE
            </span>

            <h1>
              Find a place
              <br />
              that feels like <span>home.</span>
            </h1>

            <p>
              Hi {user?.name || "there"}. Explore properties with
              an AI experience that adapts to the way you search,
              compare, and decide.
            </p>

            <div className="search-box">
              <Search size={20} />

              <input
                type="text"
                placeholder="Search by location, property type..."
              />

              <Link to="/properties" className="search-btn">
                Search
              </Link>
            </div>

            <div className="quick-actions">

              <Link to="/properties">
                <SlidersHorizontal size={17} />
                Explore Properties
              </Link>

              <Link to="/ai-assistant">
                <Brain size={17} />
                Ask AI
              </Link>

            </div>

          </div>


          {/* RIGHT SIDE */}

          <div className="hero-visual">

            <div className="hero-image-card">

              <img
                src={properties[0]?.image}
                alt="Luxury property"
              />

              <div className="floating-card">

                <ShieldCheck size={19} />

                <div>
                  <strong>AI Guided</strong>
                  <span>Property discovery</span>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================= HOME CONTENT ================= */}

        <div className="home-content">

          {/* GUIDANCE */}

          <GuidanceBanner load={load} />


          {/* FEATURED */}

          <section className="featured-section">

            <div className="section-heading">

              <div>
                <p className="small-label">
                  CURATED FOR YOU
                </p>

                <h2>
                  Featured properties
                </h2>
              </div>

              <Link to="/properties">
                View all
                <ArrowRight size={17} />
              </Link>

            </div>


            <div className="property-grid">

              {featuredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                />
              ))}

            </div>

          </section>

        </div>

      </main>
    </>
  );
}

