function AdminDashboard() {
  const stats = [
  { title: "Total Users", value: "2,481" },
  { title: "Properties", value: "128" },
  { title: "Enquiries", value: "342" },
  { title: "Active Users", value: "1,204" },
];

  const trafficData = [
    { day: "Mon", value: 55 },
    { day: "Tue", value: 72 },
    { day: "Wed", value: 48 },
    { day: "Thu", value: 85 },
    { day: "Fri", value: 68 },
    { day: "Sat", value: 92 },
    { day: "Sun", value: 78 },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Overview of AuraGen platform activity</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        {stats.map((stat) => (
          <div className="admin-stat-card" key={stat.title}>
            <p>{stat.title}</p>
            <h2>{stat.value}</h2>
            <span>{stat.change} from last week</span>
          </div>
        ))}
      </div>

      <div className="admin-dashboard-grid">
        <section className="admin-panel traffic-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Traffic Overview</h2>
              <p>Weekly platform activity</p>
            </div>
            <span className="admin-panel-badge">Last 7 days</span>
          </div>

          <div className="traffic-chart">
            {trafficData.map((item) => (
              <div className="traffic-column" key={item.day}>
                <div className="traffic-bar-area">
                  <div
                    className="traffic-bar"
                    style={{ height: `${item.value}%` }}
                  ></div>
                </div>
                <span>{item.day}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-panel alerts-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Alerts</h2>
              <p>Recent platform notifications</p>
            </div>
          </div>

          <div className="admin-alert">
            <span className="alert-dot"></span>
            <div>
              <strong>High cognitive load detected</strong>
              <p>Investment section needs attention.</p>
            </div>
          </div>

          <div className="admin-alert">
            <span className="alert-dot"></span>
            <div>
              <strong>New property added</strong>
              <p>Property listing requires review.</p>
            </div>
          </div>

          <div className="admin-alert">
            <span className="alert-dot"></span>
            <div>
              <strong>AI guidance activity increased</strong>
              <p>Users requested more assistance today.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;