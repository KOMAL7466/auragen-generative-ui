import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

function AdminAIAnalytics() {
  const aiUsageData = [
    { day: "Mon", requests: 420, cache: 260, rag: 310 },
    { day: "Tue", requests: 580, cache: 380, rag: 440 },
    { day: "Wed", requests: 390, cache: 240, rag: 290 },
    { day: "Thu", requests: 720, cache: 490, rag: 560 },
    { day: "Fri", requests: 610, cache: 410, rag: 480 },
    { day: "Sat", requests: 840, cache: 590, rag: 670 },
    { day: "Sun", requests: 710, cache: 480, rag: 550 },
  ];

  const topQuestions = [
    { question: "What is ROI?", count: 342 },
    { question: "Explain Ready to Move", count: 288 },
    { question: "Is this a good investment?", count: 241 },
    { question: "Compare these 2 properties", count: 198 },
    { question: "Nearby schools?", count: 154 },
  ];

  const feedbackData = [
    { type: "Helpful", value: 3596, fill: "#10B981" },
    { type: "Not Helpful", value: 471, fill: "#EF4444" },
    { type: "Need More", value: 214, fill: "#F59E0B" },
  ];

  return (
    <div className="admin-ai-analytics">
      <div className="admin-page-header">
        <div>
          <h1>AI Analytics</h1>
          <p>Monitor AI assistant usage and performance</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span>Total AI Requests</span>
          <strong>4,281</strong>
          <span>+22% from last week</span>
        </div>
        <div className="admin-stat-card">
          <span>Cache Hit Rate</span>
          <strong>62%</strong>
          <span>+5% from last week</span>
        </div>
        <div className="admin-stat-card">
          <span>RAG Usage</span>
          <strong>78%</strong>
          <span>+12% from last week</span>
        </div>
        <div className="admin-stat-card">
          <span>Helpful Rate</span>
          <strong>84%</strong>
          <span>+3% from last week</span>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h2>AI Usage Trends</h2>
            <p>Daily requests, cache hits, and RAG retrievals</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={aiUsageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="requests" stackId="1" stroke="#6366F1" fill="#6366F1" fillOpacity={0.6} />
            <Area type="monotone" dataKey="cache" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
            <Area type="monotone" dataKey="rag" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </section>

      <div className="admin-dashboard-grid">
        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Most Asked Questions</h2>
              <p>Top user queries</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topQuestions} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" />
              <YAxis dataKey="question" type="category" width={180} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366F1" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Feedback Breakdown</h2>
              <p>User ratings on AI guidance</p>
            </div>
          </div>
          <div className="ai-feedback-list">
            {feedbackData.map((f) => (
              <div key={f.type} className="ai-feedback-item">
                <div className="ai-feedback-label">
                  <span>{f.type}</span>
                  <strong>{f.value}</strong>
                </div>
                <div className="load-bar">
                  <div
                    className="load-fill"
                    style={{
                      width: `${(f.value / 4281) * 100}%`,
                      background: f.fill,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminAIAnalytics;