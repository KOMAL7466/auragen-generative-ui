import Navbar from "../components/Navbar";
import {
  Bot,
  MessageSquare,
  Search,
  Heart,
} from "lucide-react";
import {
  getInteractions,
} from "../services/interactionService";

export default function AdminAIAnalytics() {
  const events = getInteractions();

  const aiMessages = events.filter(
    (event) => event.type === "ai_message"
  );

  const searches = events.filter(
    (event) => event.type === "search"
  );

  const saves = events.filter(
    (event) => event.type === "save_property"
  );

  return (
    <>
      <Navbar />

      <main className="page-container">
        <div className="page-header">
          <p className="small-label">
            AI INTELLIGENCE
          </p>

          <h1>AI Analytics</h1>

          <p>
            Understand how users interact with the
            AURA AI assistant.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <Bot />
            </div>

            <div>
              <p>AI Conversations</p>
              <h2>{aiMessages.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <MessageSquare />
            </div>

            <div>
              <p>Total Events</p>
              <h2>{events.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Search />
            </div>

            <div>
              <p>Search Activity</p>
              <h2>{searches.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Heart />
            </div>

            <div>
              <p>Saved Properties</p>
              <h2>{saves.length}</h2>
            </div>
          </div>
        </div>

        <div className="analytics-panel">
          <h2>Recent AI Questions</h2>

          {aiMessages.length ? (
            <div className="activity-list">
              {aiMessages
                .slice(-10)
                .reverse()
                .map((event) => (
                  <div
                    className="activity-item"
                    key={event.id}
                  >
                    <Bot size={18} />

                    <div>
                      <strong>
                        AI Assistant Query
                      </strong>

                      <p>
                        {event.data?.message}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="muted">
              No AI interactions yet.
            </p>
          )}
        </div>
      </main>
    </>
  );
}