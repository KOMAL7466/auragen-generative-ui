import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
  // KPI Stats
  const stats = [
    { title: "Total Users", value: "2,481", change: "+12.5%", color: "#6366F1", icon: "♙" },
    { title: "Active Users", value: "1,204", change: "+8.2%", color: "#10B981", icon: "◉" },
    { title: "Properties", value: "128", change: "+5.4%", color: "#F59E0B", icon: "⌂" },
    { title: "Total Views", value: "84.2K", change: "+16.8%", color: "#22D3EE", icon: "◈" },
  ];

  // Traffic Data (Line + Area chart)
  const trafficData = [
    { day: "Mon", views: 4200, users: 3100, enquiries: 24 },
    { day: "Tue", views: 5800, users: 4200, enquiries: 32 },
    { day: "Wed", views: 3900, users: 2800, enquiries: 18 },
    { day: "Thu", views: 7200, users: 5400, enquiries: 42 },
    { day: "Fri", views: 6100, users: 4600, enquiries: 38 },
    { day: "Sat", views: 8400, users: 6200, enquiries: 51 },
    { day: "Sun", views: 7100, users: 5300, enquiries: 45 },
  ];

  // Property Categories (Pie chart)
  const categoryData = [
    { name: "Residential", value: 420, color: "#6366F1" },
    { name: "Luxury", value: 280, color: "#22D3EE" },
    { name: "Commercial", value: 180, color: "#F59E0B" },
    { name: "Investment", value: 120, color: "#EF4444" },
  ];

  // Top Cities (Bar chart)
  const cityData = [
    { city: "Chandigarh", properties: 45, value: "₹52 Cr" },
    { city: "Mohali", properties: 38, value: "₹31 Cr" },
    { city: "Panchkula", properties: 28, value: "₹18 Cr" },
    { city: "Zirakpur", properties: 17, value: "₹9 Cr" },
  ];

  // ROI Trends (Line chart)
  const roiData = [
    { month: "Jan", roi: 6.2, appreciation: 4.1 },
    { month: "Feb", roi: 6.8, appreciation: 4.5 },
    { month: "Mar", roi: 7.1, appreciation: 4.8 },
    { month: "Apr", roi: 7.5, appreciation: 5.2 },
    { month: "May", roi: 7.9, appreciation: 5.6 },
    { month: "Jun", roi: 8.4, appreciation: 6.1 },
  ];

  // Recent Activity
  const activities = [
    { id: 1, type: "enquiry", text: "Rahul Sharma enquired AE-CHD-000124", time: "2m ago" },
    { id: 2, type: "shortlist", text: "Ananya Reddy shortlisted AE-MOH-000241", time: "14m ago" },
    { id: 3, type: "register", text: "New user registered: Arjun Kumar", time: "1h ago" },
    { id: 4, type: "cog-load", text: "High cognitive load detected in Investment section", time: "2h ago" },
    { id: 5, type: "enquiry", text: "Sneha Rao enquired AE-PKL-000412", time: "3h ago" },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Overview of AuraGen platform activity</p>
        </div>
        <span className="admin-panel-badge">Live · Last 7 days</span>
      </div>

      {/* KPI STATS */}
      <div className="admin-stats-grid">
        {stats.map((stat) => (
          <div className="admin-stat-card" key={stat.title} style={{ borderLeft: `4px solid ${stat.color}` }}>
            <div className="stat-header">
              <span>{stat.title}</span>
              <span className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </span>
            </div>
            <h2>{stat.value}</h2>
            <span className="stat-change">↑ {stat.change} from last week</span>
          </div>
        ))}
      </div>

      {/* TRAFFIC + CATEGORY GRID */}
      <div className="admin-dashboard-grid">
        <section className="admin-panel traffic-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Weekly Traffic Overview</h2>
              <p>Page views, unique users, and enquiries</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="views" stroke="#6366F1" fillOpacity={1} fill="url(#colorViews)" strokeWidth={3} />
              <Area type="monotone" dataKey="users" stroke="#10B981" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Property Categories</h2>
              <p>Distribution across categories</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
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
      </div>

      {/* CITIES + ROI */}
      <div className="admin-dashboard-grid">
        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Properties by City</h2>
              <p>Distribution and total value</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="properties" fill="#6366F1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h2>ROI & Appreciation Trends</h2>
              <p>Investment performance (YTD)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={roiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="roi" stroke="#22D3EE" strokeWidth={3} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="appreciation" stroke="#F59E0B" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </div>

      {/* RECENT ACTIVITY */}
      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h2>Recent Activity</h2>
            <p>Latest platform events</p>
          </div>
        </div>
        <div className="activity-feed">
          {activities.map((a) => (
            <div key={a.id} className={`activity-item activity-${a.type}`}>
              <span className="activity-dot"></span>
              <div className="activity-content">
                <p>{a.text}</p>
                <span>{a.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;