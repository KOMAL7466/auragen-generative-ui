import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAuthUser, isLoggedIn } from "../services/authService";

const HERO_IMG = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80";
const STAT_1 = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&q=80";
const STAT_2 = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=200&q=80";
const STAT_3 = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&q=80";
const STAT_4 = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&q=80";

const PROP_1 = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80";
const PROP_2 = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80";
const PROP_3 = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80";
const HERO_CARD_1 = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80";
const HERO_CARD_2 = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80";

function UserDashboard() {
  const navigate = useNavigate();
  const user = getAuthUser();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  const stats = [
    { label: "Saved Properties", value: "12", trend: "+3 this week", img: STAT_1 },
    { label: "Shortlisted", value: "04", trend: "+1 this week", img: STAT_2 },
    { label: "Recently Viewed", value: "28", trend: "+8 this week", img: STAT_3 },
    { label: "Enquiries Sent", value: "03", trend: "1 replied", img: STAT_4 },
  ];

  const recommendations = [
    {
      img: PROP_1,
      code: "AE-CHD-000124",
      title: "The Willow Estate",
      loc: "Sector 17, Chandigarh",
      price: "₹1.15 Cr",
      tag: "Signature",
      specs: ["4 Bed", "3 Bath", "2100 sqft"],
    },
    {
      img: PROP_2,
      code: "AE-MOH-000241",
      title: "Marina Skyline",
      loc: "Phase 5, Mohali",
      price: "₹76 Lakh",
      tag: "New",
      specs: ["3 Bed", "2 Bath", "1450 sqft"],
    },
    {
      img: PROP_3,
      code: "AE-CHD-000067",
      title: "Emerald Court",
      loc: "Sector 8, Chandigarh",
      price: "₹2.4 Cr",
      tag: "Luxury",
      specs: ["5 Bed", "4 Bath", "3200 sqft"],
    },
  ];

  const activity = [
    {
      type: "viewed",
      icon: "◉",
      text: "You viewed The Willow Estate, Sector 17",
      meta: "AE-CHD-000124 · Signature Property",
      time: "2m ago",
    },
    {
      type: "saved",
      icon: "★",
      text: "You saved Marina Skyline, Phase 5",
      meta: "AE-MOH-000241 · Added to favorites",
      time: "1h ago",
    },
    {
      type: "shortlisted",
      icon: "✦",
      text: "You shortlisted Emerald Court, Sector 8",
      meta: "AE-CHD-000067 · Shortlist updated",
      time: "3h ago",
    },
    {
      type: "enquiry",
      icon: "✉",
      text: "You enquired about The Willow Estate",
      meta: "AE-CHD-000124 · Awaiting response",
      time: "Yesterday",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="user-page" style={{ paddingTop: "40px" }}>
        {/* ============ HERO ============ */}
        <div className="dash-hero">
          <div className="dash-hero-bg">
            <img src={HERO_IMG} alt="Luxury property" />
          </div>

          <div className="dash-hero-content">
            <div className="dash-hero-text">
              <div className="dash-hero-greeting">
                <span className="dot"></span>
                Dashboard · Live
              </div>
              <h1>
                Welcome back, <br />
                <span className="gold">{user?.name || "Guest"}</span>.
              </h1>
              <p>
                Your curated collection is waiting. Track properties,
                explore AI-powered insights, and make confident decisions
                with AuraGen's adaptive guidance.
              </p>
              <div className="dash-hero-cta">
                <button className="btn-primary" onClick={() => navigate("/properties")}>
                  Explore Properties
                </button>
                <button className="btn-ghost">View Analytics</button>
              </div>
            </div>

            <div className="dash-hero-visual">
              <div className="dash-hero-card card-1">
                <img src={HERO_CARD_1} alt="Property" />
                <div className="dash-hero-card-body">
                  <div className="title">The Willow Estate</div>
                  <div className="price">₹1.15 Cr</div>
                </div>
              </div>
              <div className="dash-hero-card card-2">
                <img src={HERO_CARD_2} alt="Property" />
                <div className="dash-hero-card-body">
                  <div className="title">Emerald Court</div>
                  <div className="price">₹2.4 Cr</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============ STATS ============ */}
        <div className="lux-stats">
          {stats.map((s, i) => (
            <div key={i} className="lux-stat">
              <div className="lux-stat-icon-img">
                <img src={s.img} alt={s.label} />
              </div>
              <div className="lux-stat-label">
                <span className="gold-dot"></span>
                {s.label}
              </div>
              <div className="lux-stat-value">{s.value}</div>
              <div className="lux-stat-trend">
                <span className="arrow-up">↑</span>
                {s.trend}
              </div>
            </div>
          ))}
        </div>

        {/* ============ RECOMMENDED ============ */}
        <div className="lux-section-title">
          <div className="title-block">
            <h2>
              Recommended <span className="italic">for you</span>
            </h2>
            <p>Handpicked properties based on your browsing activity</p>
          </div>
          <div className="link-more" onClick={() => navigate("/properties")}>
            View All →
          </div>
        </div>

        <div className="lux-property-grid">
          {recommendations.map((p, i) => (
            <div
              key={i}
              className="lux-property-card"
              onClick={() => navigate(`/property/${p.code}`)}
            >
              <div className="lux-property-img">
                <img src={p.img} alt={p.title} />
                <span className="lux-property-tag">{p.tag}</span>
                <div className="lux-property-fav">♡</div>
              </div>
              <div className="lux-property-info">
                <span className="lux-property-code">{p.code}</span>
                <h3>{p.title}</h3>
                <div className="lux-property-loc">📍 {p.loc}</div>
                <div className="lux-property-price-row">
                  <div className="lux-property-price">
                    <span className="gold-accent">Starting</span>
                    {p.price}
                  </div>
                  <div className="lux-property-specs">
                    {p.specs.map((sp, idx) => (
                      <span key={idx}>{sp}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ============ ACTIVITY ============ */}
        <div className="lux-section-title">
          <div className="title-block">
            <h2>
              Your recent <span className="italic">activity</span>
            </h2>
            <p>A timeline of your latest interactions</p>
          </div>
        </div>

        <div className="lux-timeline">
          {activity.map((a, i) => (
            <div key={i} className="lux-timeline-row">
              <div className={`lux-timeline-marker ${a.type}`}>{a.icon}</div>
              <div className="lux-timeline-content">
                <p>{a.text}</p>
                <div className="meta">{a.meta}</div>
              </div>
              <div className="lux-timeline-time">{a.time}</div>
            </div>
          ))}
        </div>

        {/* ============ AI INSIGHT ============ */}
        <div className="lux-ai-insight">
          <div className="lux-ai-insight-icon">✦</div>
          <div className="lux-ai-insight-content">
            <div className="eyebrow">AuraGen AI · Personal Insight</div>
            <h3>
              We found <span className="italic">3 new matches</span> for your search.
            </h3>
            <p>
              Based on your interest in premium 3-4 BHK properties in
              Chandigarh and Mohali under ₹1.5 Cr, our AI has identified
              new listings that align with your investment goals. Want me
              to explain their rental potential and future appreciation?
            </p>
            <button className="lux-ai-insight-btn">
              Explore matches →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;