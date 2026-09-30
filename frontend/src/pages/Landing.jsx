import { useState } from "react";
import { Link } from "react-router-dom";

const HERO_IMG = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80";
const PROP_1 = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80";
const PROP_2 = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80";
const PROP_3 = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80";
const HERO_CARD_1 = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80";
const HERO_CARD_2 = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80";

const AVATAR_1 = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80";
const AVATAR_2 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80";
const AVATAR_3 = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80";

function Landing() {
  const [openFaq, setOpenFaq] = useState(0);

  const features = [
    { icon: "◆", title: "Cognitive Load Detection", desc: "Our engine silently observes your interactions and detects when you're struggling — before you give up." },
    { icon: "✦", title: "Adaptive Interface", desc: "The UI intelligently simplifies itself based on your cognitive load — LOW, MEDIUM, or HIGH." },
    { icon: "◈", title: "AI Property Advisor", desc: "Ask anything about properties, investment, or real estate terms. Get contextual, human-like answers." },
    { icon: "▣", title: "Investment Intelligence", desc: "Historical trends, future estimates, rental yield, ROI — all presented beautifully." },
    { icon: "◉", title: "Location Insights", desc: "Interactive maps with nearby schools, hospitals, metro stations, and upcoming developments." },
    { icon: "★", title: "Smart Shortlisting", desc: "Save, compare, and receive AI-powered recommendations tailored to your preferences." },
  ];

  const trustStats = [
    { num: "128+", lbl: "Premium Properties" },
    { num: "2.4K+", lbl: "Active Users" },
    { num: "12", lbl: "Cities Covered" },
    { num: "98%", lbl: "Satisfaction Rate" },
  ];

  const compareOld = [
    "Endless listings with no context",
    "Confusing real estate jargon",
    "Same experience for every user",
    "No help when you're stuck",
    "Hard to compare properties",
    "Numbers without meaning",
  ];

  const compareNew = [
    "Curated, verified premium listings",
    "Plain language, always explained",
    "UI adapts to how YOU think",
    "AI detects struggle and guides you",
    "Side-by-side intelligent comparison",
    "Investment insights with AI reasoning",
  ];

  const steps = [
    { num: "01", title: "Discover", desc: "Browse verified premium properties across top cities" },
    { num: "02", title: "Understand", desc: "Get AI-powered investment insights and analysis" },
    { num: "03", title: "Compare", desc: "Shortlist and compare your top picks side-by-side" },
    { num: "04", title: "Decide", desc: "Make informed decisions with complete confidence" },
  ];

  const featured = [
    { img: PROP_1, title: "The Willow Estate", loc: "Sector 17, Chandigarh", price: "₹1.15 Cr", tag: "Signature", specs: "4 Bed · 3 Bath · 2100 sqft" },
    { img: PROP_2, title: "Marina Skyline", loc: "Phase 5, Mohali", price: "₹76 Lakh", tag: "New", specs: "3 Bed · 2 Bath · 1450 sqft" },
    { img: PROP_3, title: "Emerald Court", loc: "Sector 8, Chandigarh", price: "₹2.4 Cr", tag: "Luxury", specs: "5 Bed · 4 Bath · 3200 sqft" },
  ];

  const testimonials = [
    {
      text: "AuraGen felt like having a personal property advisor. The AI explained everything in simple terms, and the interface literally adapted when I got confused.",
      name: "Aarav Mehta",
      role: "First-time Buyer · Chandigarh",
      avatar: AVATAR_1,
    },
    {
      text: "The investment insights are unmatched. I could see historical trends, future estimates, and nearby development — all in one place. Made my decision 10x easier.",
      name: "Priya Sharma",
      role: "Property Investor · Mohali",
      avatar: AVATAR_2,
    },
    {
      text: "What makes AuraGen different is the cognitive load detection. It genuinely feels like the platform understands when you need help — before you ask.",
      name: "Rohan Kapoor",
      role: "Home Buyer · Panchkula",
      avatar: AVATAR_3,
    },
  ];

  const faqs = [
    {
      q: "What makes AuraGen different from other real estate platforms?",
      a: "AuraGen is the first platform built around cognitive load detection. It observes your interactions and silently adapts the interface — simplifying complexity, highlighting what matters, and guiding you when you struggle. No other real estate platform does this.",
    },
    {
      q: "How does the AI recommend investments?",
      a: "Our AI analyzes historical price trends, rental yield, nearby development, connectivity, and market data. It then generates a transparent recommendation with reasoning — never a blind score. You always see why a property is suggested.",
    },
    {
      q: "Do I need to be a real estate expert to use AuraGen?",
      a: "Not at all. AuraGen is designed for everyone. Complex terms are auto-explained. Investment data is presented in plain language. And if you ever feel stuck, our adaptive AI offers contextual guidance.",
    },
    {
      q: "Is my data secure?",
      a: "Yes. We use industry-standard encryption, JWT-based authentication, and follow responsible AI practices. Your personal information and browsing behavior are never shared with third parties.",
    },
    {
      q: "Can I use AuraGen on my phone?",
      a: "Absolutely. AuraGen is fully responsive. The adaptive interface works beautifully across desktop, tablet, and mobile — with the same intelligent guidance everywhere.",
    },
  ];

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="landing-hero">
        <div className="landing-hero-bg">
          <img src={HERO_IMG} alt="Luxury property" />
        </div>

        <div className="landing-hero-inner">
          <div>
            <div className="landing-hero-eyebrow">
              <span className="dot"></span>
              AI · Real Estate · Redefined
            </div>

            <h1>
              Property Search, <br />
              <span className="highlight">Reimagined</span> with AI.
            </h1>

            <p>
              AuraGen is the world's first adaptive real estate platform.
              It understands when you struggle, simplifies itself, and guides
              you to confident decisions — like having an advisor beside you.
            </p>

            <div className="landing-cta">
              <Link to="/register">
                <button className="btn-primary">Begin Your Journey</button>
              </Link>
              <Link to="/login">
                <button className="btn-ghost">Sign In</button>
              </Link>
            </div>

            <div className="landing-hero-stats">
              <div className="landing-hero-stat">
                <span className="num">128+</span>
                <span className="lbl">Premium Properties</span>
              </div>
              <div className="landing-hero-stat">
                <span className="num">2.4K+</span>
                <span className="lbl">Active Users</span>
              </div>
              <div className="landing-hero-stat">
                <span className="num">98%</span>
                <span className="lbl">Satisfaction</span>
              </div>
            </div>
          </div>

          <div className="landing-hero-visual">
            <div className="hero-property-card main">
              <img src={HERO_CARD_1} alt="Featured property" />
              <div className="card-title">The Willow Estate</div>
              <div className="card-loc">📍 Sector 17, Chandigarh</div>
              <div className="card-price">₹1.15 Cr</div>
            </div>

            <div className="hero-property-card secondary">
              <img src={HERO_CARD_2} alt="Featured property" />
              <div className="card-title">Emerald Court</div>
              <div className="card-loc">📍 Sector 8, Chandigarh</div>
              <div className="card-price">₹2.4 Cr</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TRUST BAND ==================== */}
      <section className="trust-band">
        <div className="trust-band-inner">
          {trustStats.map((s, i) => (
            <div key={i} className="trust-stat">
              <div className="num">{s.num}</div>
              <div className="lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="landing-section">
        <div className="landing-section-header">
          <div className="landing-section-eyebrow">Why AuraGen</div>
          <h2>
            Not another listing site. <br />
            A <span className="italic">cognitive-first</span> platform.
          </h2>
          <p>
            Every other real estate website is the same. AuraGen studies how
            you interact, and adapts to your needs — automatically.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== WHY DIFFERENT ==================== */}
      <section className="landing-section">
        <div className="landing-section-header">
          <div className="landing-section-eyebrow">The Difference</div>
          <h2>
            What we <span className="italic">replaced</span>.
          </h2>
          <p>
            Other platforms leave you alone with your confusion. AuraGen
            walks beside you.
          </p>
        </div>

        <div className="compare-grid">
          <div className="compare-card old">
            <h3>Traditional Platforms</h3>
            <ul className="compare-list">
              {compareOld.map((item, i) => (
                <li key={i}>
                  <span className="icon">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="compare-card new">
            <h3>
              The <span className="gold">AuraGen</span> Way
            </h3>
            <ul className="compare-list">
              {compareNew.map((item, i) => (
                <li key={i}>
                  <span className="icon">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="landing-section-dark">
        <div className="landing-section-header">
          <div className="landing-section-eyebrow">The Process</div>
          <h2>
            Four steps to your <span className="italic">dream property</span>.
          </h2>
          <p>
            No more endless tabs. No more confusing jargon. Just clear,
            guided decisions.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((s, i) => (
            <div key={i} className="step-card">
              <div className="step-number">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== FEATURED PROPERTIES ==================== */}
      <section className="landing-section">
        <div className="landing-section-header">
          <div className="landing-section-eyebrow">Featured</div>
          <h2>
            Handpicked <span className="italic">signature</span> properties.
          </h2>
          <p>
            Each listing is verified, beautifully presented, and packed with
            AI-generated insights.
          </p>
        </div>

        <div className="featured-grid">
          {featured.map((p, i) => (
            <div key={i} className="featured-card">
              <div className="featured-card-img">
                <img src={p.img} alt={p.title} />
                <span className="featured-card-tag">{p.tag}</span>
              </div>
              <div className="featured-card-body">
                <h3>{p.title}</h3>
                <div className="featured-card-loc">📍 {p.loc}</div>
                <div className="featured-card-price-row">
                  <div className="featured-card-price">{p.price}</div>
                  <div className="featured-card-specs">
                    <span>{p.specs}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="landing-section">
        <div className="landing-section-header">
          <div className="landing-section-eyebrow">Voices</div>
          <h2>
            Loved by <span className="italic">discerning buyers</span>.
          </h2>
          <p>
            Real experiences from people who found their perfect property
            with AuraGen's guidance.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  <img src={t.avatar} alt={t.name} />
                </div>
                <div className="testimonial-author-info">
                  <div className="name">{t.name}</div>
                  <div className="role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="landing-section">
        <div className="landing-section-header">
          <div className="landing-section-eyebrow">Questions</div>
          <h2>
            Everything you <span className="italic">need to know</span>.
          </h2>
          <p>Answers to the questions we hear most often.</p>
        </div>

        <div className="faq-list">
          {faqs.map((f, i) => (
            <div
              key={i}
              className={`faq-item ${openFaq === i ? "open" : ""}`}
            >
              <div
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                <span>{f.q}</span>
                <span className="faq-toggle">+</span>
              </div>
              {openFaq === i && (
                <div className="faq-answer">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ==================== ROLE CHOICE ==================== */}
      <section className="landing-section">
        <div className="landing-section-header">
          <div className="landing-section-eyebrow">Get Started</div>
          <h2>
            Choose your <span className="italic">journey</span>.
          </h2>
          <p>Whether you're finding a home or managing the platform.</p>
        </div>

        <div className="role-choice-grid">
          <Link to="/register" className="role-choice-card">
            <div className="role-icon">👤</div>
            <h3>I'm a Buyer</h3>
            <p>
              Browse premium properties, use AI guidance, save favorites,
              and receive personalized recommendations.
            </p>
            <span className="role-arrow">Continue as Buyer →</span>
          </Link>

          <Link to="/admin/login" className="role-choice-card admin">
            <div className="role-icon">🛡</div>
            <h3>I'm an Admin</h3>
            <p>
              Manage properties, users, enquiries, and monitor cognitive load
              analytics in real-time.
            </p>
            <span className="role-arrow">Continue as Admin →</span>
          </Link>
        </div>
      </section>

      {/* ==================== CTA BAND ==================== */}
      <section className="cta-band">
        <div className="cta-band-inner">
          <h2>
            Your perfect property is <span className="italic">one click away</span>.
          </h2>
          <p>
            Join thousands who've reimagined how they search, understand,
            and decide on real estate.
          </p>
          <div className="cta-band-buttons">
            <Link to="/register">
              <button className="btn-primary">Start Free Today</button>
            </Link>
            <Link to="/login">
              <button className="btn-ghost">I Already Have an Account</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="landing-footer">
        <div className="footer-brand">🏛 AuraGen</div>
        <div className="footer-tagline">Properties Made Personal · Powered by AI</div>
        <p style={{ marginTop: "20px" }}>
          Where intelligence meets luxury real estate.
        </p>
        <div className="footer-copy">
          © 2026 AuraGen · Crafted with FastAPI · React · PostgreSQL
        </div>
      </footer>
    </>
  );
}

export default Landing;