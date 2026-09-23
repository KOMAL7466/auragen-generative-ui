import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

function AdminAnalytics() {
  const trafficData = [
    { day: "Mon", views: 4200, users: 3100 },
    { day: "Tue", views: 5800, users: 4200 },
    { day: "Wed", views: 3900, users: 2800 },
    { day: "Thu", views: 7200, users: 5400 },
    { day: "Fri", views: 6100, users: 4600 },
    { day: "Sat", views: 8400, users: 6200 },
    { day: "Sun", views: 7100, users: 5300 },
  ];

  const categoryData = [
    { name: "Residential", value: 420, color: "#10B981" },
    { name: "Luxury", value: 280, color: "#6366F1" },
    { name: "Commercial", value: 180, color: "#F59E0B" },
    { name: "Investment", value: 120, color: "#EF4444" },
  ];

  const cityData = [
    { city: "Chandigarh", properties: 45 },
    { city: "Mohali", properties: 38 },
    { city: "Panchkula", properties: 28 },
    { city: "Zirakpur", properties: 17 },
  ];

  return (
    <div className="admin-analytics">
      <div className="admin-page-header">
        <div>
          <h1>Analytics</h1>
          <p>Platform performance and insights</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span>Page Views</span>
          <strong>84,210</strong>
          <span>+16.8% from last week</span>
        </div>
        <div className="admin-stat-card">
          <span>Unique Visitors</span>
          <strong>31,240</strong>
          <span>+11.2% from last week</span>
        </div>
        <div className="admin-stat-card">
          <span>Avg. Session</span>
          <strong>4m 12s</strong>
          <span>+8.2% from last week</span>
        </div>
        <div className="admin-stat-card">
          <span>Conversion</span>
          <strong>4.8%</strong>
          <span>+2.1% from last week</span>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h2>Weekly Traffic</h2>
            <p>Page views and unique users over time</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#6366F1" strokeWidth={3} />
            <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <div className="admin-dashboard-grid">
        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Property Categories</h2>
              <p>Distribution by category</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Properties by City</h2>
              <p>Distribution across locations</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="properties" fill="#6366F1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>
    </div>
  );
}

export default AdminAnalytics;