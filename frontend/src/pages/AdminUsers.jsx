import { useState } from "react";

function AdminUsers() {
  const [users, setUsers] = useState([
    { id: "U001", name: "Rahul Sharma", email: "rahul@example.com", role: "User", status: "Active" },
    { id: "U002", name: "Ananya Reddy", email: "ananya@example.com", role: "User", status: "Active" },
    { id: "U003", name: "Arjun Kumar", email: "arjun@example.com", role: "User", status: "Inactive" },
    { id: "U004", name: "Sneha Rao", email: "sneha@example.com", role: "User", status: "Active" },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [viewUser, setViewUser] = useState(null); // ✅ NOW INSIDE COMPONENT

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();

    setUsers(
      users.map((user) =>
        user.id === editingId
          ? {
              ...user,
              name: formData.name,
              email: formData.email,
              role: formData.role,
              status: formData.status,
            }
          : user
      )
    );

    setEditingId(null);

    setFormData({
      name: "",
      email: "",
      role: "User",
      status: "Active",
    });
  };

  return (
    <div className="admin-users">
      <div className="admin-page-header">
        <div>
          <h1>User Management</h1>
          <p>Manage and monitor registered users</p>
        </div>
      </div>

      {editingId && (
        <section className="admin-panel add-property-form">
          <div className="admin-panel-header">
            <div>
              <h2>Edit User</h2>
              <p>Update user information</p>
            </div>

            <button
              className="form-close-button"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  name: "",
                  email: "",
                  role: "User",
                  status: "Active",
                });
              }}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleUpdateUser}>
            <div className="property-form-grid">
              <div className="admin-form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Role</label>
                <select name="role" value={formData.role} onChange={handleChange}>
                  <option>User</option>
                  <option>Admin</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <button type="submit" className="admin-add-button">
              Update User
            </button>
          </form>
        </section>
      )}

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h2>All Users</h2>
            <p>View and manage registered users</p>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span
                      className={`property-status ${
                        user.status === "Active" ? "available" : "sold"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td>
                    <div className="property-actions">
                      {/* View — MODAL */}
                      <button onClick={() => setViewUser(user)}>
                        View
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => {
                          setEditingId(user.id);
                          setFormData({
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            status: user.status,
                          });
                        }}
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        className="delete-action"
                        onClick={() => {
                          setUsers(users.filter((item) => item.id !== user.id));
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* View User Modal */}
      {viewUser && (
        <div className="admin-modal-overlay" onClick={() => setViewUser(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>User Details</h2>
              <button onClick={() => setViewUser(null)}>×</button>
            </div>
            <div className="admin-modal-body">
              <p><strong>ID:</strong> {viewUser.id}</p>
              <p><strong>Name:</strong> {viewUser.name}</p>
              <p><strong>Email:</strong> {viewUser.email}</p>
              <p><strong>Role:</strong> {viewUser.role}</p>
              <p><strong>Status:</strong> {viewUser.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;