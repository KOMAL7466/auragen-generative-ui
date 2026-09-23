import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

function AdminCognitiveLoad() {
  // Sessions data
  const sessions = [
    { id: "S001", user: "Rahul Sharma", score: 25, level: "LOW", time: "2m 15s", repeatedClicks: 2, backForward: 1, inactivity: "10s", helpRequests: 0, attempts: 1, validationErrors: 0 },
    { id: "S002", user: "Ananya Reddy", score: 52, level: "MEDIUM", time: "4m 32s", repeatedClicks: 5, backForward: 2, inactivity: "20s", helpRequests: 1, attempts: 1, validationErrors: 2 },
    { id: "S003", user: "Arjun Kumar", score: 78, level: "HIGH", time: "7m 18s", repeatedClicks: 3, backForward: 4, inactivity: "30s", helpRequests: 3, attempts: 3, validationErrors: 5 },
    { id: "S004", user: "Sneha Rao", score: 35, level: "MEDIUM", time: "3m 05s", repeatedClicks: 6, backForward: 1, inactivity: "50s", helpRequests: 1, attempts: 2, validationErrors: 1 },
    { id: "S005", user: "Vikram Singh", score: 82, level: "HIGH", time: "8m 02s", repeatedClicks: 7, backForward: 5, inactivity: "45s", helpRequests: 4, attempts: 4, validationErrors: 6 },
  ];

  // Score distribution (histogram)
  const scoreDistribution = [
    { range: "0-20", count: 18 },
    { range: "21-40", count: 34 },
    { range: "41-60", count: 28 },
    { range: "61-80", count: 16 },
    { range: "81-100", count: 8 },
  ];

  // Load distribution
  const loadDistribution = [
    { name: "LOW", value: 72, color: "#10B981" },
    { name: "MEDIUM", value: 21, color: "#F59E0B" },
    { name: "HIGH", value: 7, color: "#EF4444" },
  ];

  // Top hotspots (bar)
  const hotspots = [
    { section: "Investment", events: 128 },
    { section: "Compare Tool", events: 94 },
    { section: "Enquiry Form", events: 71 },
    { section: "Filters", events: 52 },
    { section: "Registration", events: 38 },
  ];

  // Event type breakdown (radar)
  const eventRadar = [
    { type: "Validation Error", count: 128 },
    { type: "Repeated Click", count: 94 },
    { type: "Help Request", count: 76 },
    { type: "Section Revisit", count: 52 },
    { type: "Back Nav", count: 45 },
    { type: "Inactivity", count: 38 },
  ];

  // Session timeline
  const timelineData = [
    { time: "0m", load: 0 },
    { time: "1m", load: 15 },
    { time: "2m", load: 28 },
    { time: "3m", load: 45 },
    { time: "4m", load: 52 },
    { time: "5m", load: 68 },
    { time: "6m", load: 78 },
    { time: "7m", load: 85 },
  ];

  const getLevelClass = (level) => {
    if (level === "LOW") return "available";
    if (level === "MEDIUM") return "medium";
    return "sold";
  };

  return (
    <div className="admin-cognitive-load">
      <div className="admin-page-header">
        <div>
          <h1>Cognitive Load Analytics</h1>
          <p>Monitor user difficulty and cognitive load levels</p>
        </div>
        <span className="admin-panel-badge">Last 7 days</span>
      </div>

      {/* STATS */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card" style={{ borderLeft: "4px solid #6366F1" }}>
          <span>Total Sessions</span>
          <strong>128</strong>
          <span className="stat-change">↑ 12 this week</span>
        </div>
        <div className="admin-stat-card" style={{ borderLeft: "4px solid #10B981" }}>
          <span>Low Load</span>
          <strong>72</strong>
          <span className="stat-change">56% of sessions</span>
        </div>
        <div className="admin-stat-card" style={{ borderLeft: "4px solid #F59E0B" }}>
          <span>Medium Load</span>
          <strong>38</strong>
          <span className="stat-change">30% of sessions</span>
        </div>
        <div className="admin-stat-card" style={{ borderLeft: "4px solid #EF4444" }}>
          <span>High Load</span>
          <strong>18</strong>
          <span className="stat-change">14% of sessions</span>
        </div>
      </div>

      {/* LOAD DISTRIBUTION + SCORE HISTOGRAM */}
      <div className="admin-dashboard-grid">
        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Load Distribution</h2>
              <p>Distribution of cognitive load across sessions</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={loadDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {loadDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Score Distribution</h2>
              <p>Sessions by cognitive load score range</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={scoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {scoreDistribution.map((entry, index) => {
                  const colors = ["#10B981", "#84CC16", "#F59E0B", "#EF4444", "#B91C1C"];
                  return <Cell key={index} fill={colors[index]} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>

      {/* HOTSPOTS + RADAR */}
      <div className="admin-dashboard-grid">
        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Top Confusing Sections</h2>
              <p>Areas where users struggle most</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hotspots} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" />
              <YAxis dataKey="section" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="events" fill="#EF4444" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Event Type Breakdown</h2>
              <p>Distribution of struggle signals</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={eventRadar}>
              <PolarGrid />
              <PolarAngleAxis dataKey="type" />
              <PolarRadiusAxis />
              <Radar name="Events" dataKey="count" stroke="#6366F1" fill="#6366F1" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </section>
      </div>

      {/* SESSION TIMELINE */}
      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h2>Session Load Timeline</h2>
            <p>How cognitive load evolves during a user session</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="load" stroke="#6366F1" strokeWidth={3} dot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* SESSIONS TABLE */}
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
                <th>Validation Errors</th>
                <th>Level</th>
                <th>Session Time</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.user}</td>
                  <td><strong>{s.score}</strong></td>
                  <td>{s.repeatedClicks}</td>
                  <td>{s.backForward}</td>
                  <td>{s.inactivity}</td>
                  <td>{s.helpRequests}</td>
                  <td>{s.validationErrors}</td>
                  <td>
                    <span className={`property-status ${getLevelClass(s.level)}`}>
                      {s.level}
                    </span>
                  </td>
                  <td>{s.time}</td>
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