function AdminEnquiries() {
  const enquiries = [
    { id: "E001", user: "Rahul Sharma", property: "AE-CHD-000124", message: "Is price negotiable?", status: "Pending", date: "22 Sep 2026" },
    { id: "E002", user: "Ananya Reddy", property: "AE-MOH-000241", message: "Site visit this weekend?", status: "Responded", date: "21 Sep 2026" },
    { id: "E003", user: "Arjun Kumar", property: "AE-CHD-000089", message: "Rental yield details?", status: "Closed", date: "20 Sep 2026" },
    { id: "E004", user: "Sneha Rao", property: "AE-PKL-000412", message: "Available for immediate possession?", status: "Pending", date: "19 Sep 2026" },
  ];

  const getStatusClass = (status) => {
    if (status === "Pending") return "medium";
    if (status === "Responded") return "available";
    return "sold";
  };

  return (
    <div className="admin-enquiries">
      <div className="admin-page-header">
        <div>
          <h1>Enquiries</h1>
          <p>Manage property enquiries from users</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span>Total Enquiries</span>
          <strong>342</strong>
        </div>
        <div className="admin-stat-card">
          <span>Pending</span>
          <strong>87</strong>
        </div>
        <div className="admin-stat-card">
          <span>Responded</span>
          <strong>198</strong>
        </div>
        <div className="admin-stat-card">
          <span>Closed</span>
          <strong>57</strong>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h2>All Enquiries</h2>
            <p>View and respond to user enquiries</p>
          </div>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Property</th>
                <th>Message</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.user}</td>
                  <td>{e.property}</td>
                  <td>{e.message}</td>
                  <td>
                    <span className={`property-status ${getStatusClass(e.status)}`}>
                      {e.status}
                    </span>
                  </td>
                  <td>{e.date}</td>
                  <td>
                    <div className="property-actions">
                      <button>View</button>
                      <button>Reply</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminEnquiries;