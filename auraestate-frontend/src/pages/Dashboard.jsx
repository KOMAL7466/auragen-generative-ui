import {
  Heart,
  Bookmark,
  Clock,
  Mail,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

import {
  getCurrentUser,
  getStoredItems,
} from "../services/api";

export default function Dashboard() {
  const user = getCurrentUser();

  const saved =
    getStoredItems("saved");

  const shortlisted =
    getStoredItems("shortlisted");

  const recent =
    getStoredItems("recentlyViewed");

  const enquiries =
    getStoredItems("enquiries");

  return (
    <>
      <Navbar />

      <main className="page-container">

        {/* HEADER */}

        <section className="page-header">

          <p className="small-label">
            YOUR SPACE
          </p>

          <h1>
            Welcome,{" "}
            {user?.name || "User"}
          </h1>

          <p>
            Here's everything you're
            tracking across AURAESTATE.
          </p>

        </section>


        {/* STATS */}

        <div className="stats-grid">

          <StatCard
            title="Saved Properties"
            value={saved.length}
            icon={<Heart />}
          />

          <StatCard
            title="Shortlisted"
            value={shortlisted.length}
            icon={<Bookmark />}
          />

          <StatCard
            title="Recently Viewed"
            value={recent.length}
            icon={<Clock />}
          />

          <StatCard
            title="Enquiries"
            value={enquiries.length}
            icon={<Mail />}
          />

        </div>


        {/* DASHBOARD LINKS */}

        <section className="dashboard-links">

          {/* SAVED */}

          <Link
            to="/saved"
            className="dashboard-link"
          >
            <Heart />

            <div>
              <strong>
                Saved Properties
              </strong>

              <span>
                View properties you liked
              </span>
            </div>

            <ArrowRight />
          </Link>


          {/* SHORTLISTED */}

          <Link
            to="/shortlisted"
            className="dashboard-link"
          >
            <Bookmark />

            <div>
              <strong>
                Shortlisted
              </strong>

              <span>
                Compare your preferred
                properties
              </span>
            </div>

            <ArrowRight />
          </Link>


          {/* RECENTLY VIEWED */}

          <Link
            to="/recently-viewed"
            className="dashboard-link"
          >
            <Clock />

            <div>
              <strong>
                Recently Viewed
              </strong>

              <span>
                Continue where you left
                off
              </span>
            </div>

            <ArrowRight />
          </Link>


          {/* ENQUIRIES */}

          <Link
            to="/enquiries"
            className="dashboard-link"
          >
            <Mail />

            <div>
              <strong>
                My Enquiries
              </strong>

              <span>
                Track your property
                enquiries
              </span>
            </div>

            <ArrowRight />
          </Link>

        </section>

      </main>
    </>
  );
}