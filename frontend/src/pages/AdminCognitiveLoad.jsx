import { useState } from "react";

function AdminCognitiveLoad() {
  const [sessions] = useState([
    {
      id: "S001",
      user: "Rahul Sharma",
      score: 25,
      level: "Low",
      time: "2m 15s",
      repeatedClicks: 2,
      backForward: 1,
      inactivity: "10s",
      helpRequests: 0,
      attempts: 1,
      validationErrors: 0
    },
    {
      id: "S002",
      user: "Ananya Reddy",
      score: 52,
      level: "Medium",
      time: "4m 32s",
      repeatedClicks: 5,
      backForward: 2,
      inactivity: "20s",
      helpRequests: 1,
      attempts: 1,
      validationErrors: 2
    },
    {
      id: "S003",
      user: "Arjun Kumar",
      score: 78,
      level: "High",
      time: "7m 18s",
      repeatedClicks: 3,
      backForward: 4,
      inactivity: "30s",
      helpRequests: 3,
      attempts: 3,
      validationErrors: 5
    },
    {
      id: "S004",
      user: "Sneha Rao",
      score: 35,
      level: "Low",
      time: "3m 05s",
      repeatedClicks: 6,
      backForward: 1,
      inactivity: "50s",
      helpRequests: 1,
      attempts: 2,
      validationErrors: 1
    },
  ]);

  return (
    <div className="admin-cognitive-load">
      <div className="admin-page-header">
        <div>
          <h1>Cognitive Load Analytics</h1>
          <p>
            Monitor user difficulty and cognitive load levels
          </p>
        </div>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span>Total Sessions</span>
          <strong>128</strong>
        </div>

        <div className="admin-stat-card">
          <span>Low Load</span>
          <strong>72</strong>
        </div>

        <div className="admin-stat-card">
          <span>Medium Load</span>
          <strong>38</strong>
        </div>

        <div className="admin-stat-card">
          <span>High Load</span>
          <strong>18</strong>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h2>Load Distribution</h2>
            <p>
              Distribution of cognitive load across sessions
            </p>
          </div>
        </div>

        <div className="load-distribution">
          <div className="load-item">
            <div className="load-label">
              <span>Low Load</span>
              <strong>56%</strong>
            </div>

            <div className="load-bar">
              <div className="load-fill low-load"></div>
            </div>
          </div>

          <div className="load-item">
            <div className="load-label">
              <span>Medium Load</span>
              <strong>30%</strong>
            </div>

            <div className="load-bar">
              <div className="load-fill medium-load"></div>
            </div>
          </div>

          <div className="load-item">
            <div className="load-label">
              <span>High Load</span>
              <strong>14%</strong>
            </div>

            <div className="load-bar">
              <div className="load-fill high-load"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h2>Recent Cognitive Load Sessions</h2>
            <p>Monitor user interaction difficulty</p>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Session ID</th>
                <th>User</th>
                <th>Score</th>
                <th>Repeated Clicks</th>
                <th>Back/Forward</th>
                <th>Inactivity</th>
                <th>Help Requests</th>
                <th>Attempts</th>
                <th>Validation Errors</th>
                <th>Level</th>
                <th>Session Time</th>
              </tr>
            </thead>

            <tbody>
              {sessions.map((session) => (
                <tr key={session.id}>
                  <td>{session.id}</td>

                  <td>{session.user}</td>

                  <td>{session.score}</td>

                  <td>{session.repeatedClicks}</td>

                  <td>{session.backForward}</td>

                  <td>{session.inactivity}</td>

                  <td>{session.helpRequests}</td>

                  <td>{session.attempts}</td>

                  <td>{session.validationErrors}</td>

                  <td>
                    <span
                      className={`property-status ${
                        session.level === "Low"
                          ? "available"
                          : session.level === "Medium"
                          ? "medium"
                          : "sold"
                      }`}
                    >
                      {session.level}
                    </span>
                  </td>

                  <td>{session.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminCognitiveLoad;