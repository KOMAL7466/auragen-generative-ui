import { useState } from "react";

function AdminProperties() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [properties, setProperties] = useState([
    {
      id: "P001",
      name: "Green Valley Apartments",
      type: "Apartment",
      price: "₹65 Lakhs",
      status: "Available",
    },
    {
      id: "P002",
      name: "Sunrise Residency",
      type: "Villa",
      price: "₹1.2 Cr",
      status: "Available",
    },
    {
      id: "P003",
      name: "Lake View Heights",
      type: "Apartment",
      price: "₹82 Lakhs",
      status: "Sold",
    },
    {
      id: "P004",
      name: "Urban Nest",
      type: "Plot",
      price: "₹45 Lakhs",
      status: "Available",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    type: "Apartment",
    price: "",
    status: "Available",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProperty = (e) => {
    e.preventDefault();

    if (editingId) {
      setProperties(
        properties.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: formData.name,
                type: formData.type,
                price: formData.price,
                status: formData.status,
              }
            : item
        )
      );

      setEditingId(null);
    } else {
      const newProperty = {
        id: `P${String(properties.length + 1).padStart(3, "0")}`,
        name: formData.name,
        type: formData.type,
        price: formData.price,
        status: formData.status,
      };

      setProperties([...properties, newProperty]);
    }

    setFormData({
      name: "",
      type: "Apartment",
      price: "",
      status: "Available",
    });

    setShowForm(false);
  };

  return (
    <div className="admin-properties">
      <div className="admin-page-header property-header">
        <div>
          <h1>Property Management</h1>
          <p>Manage and monitor property listings</p>
        </div>

        <button
          className="admin-add-button"
          onClick={() => {
            setEditingId(null);
            setFormData({
              name: "",
              type: "Apartment",
              price: "",
              status: "Available",
            });
            setShowForm(true);
          }}
        >
          + Add Property
        </button>
      </div>

      {showForm && (
        <section className="admin-panel add-property-form">
          <div className="admin-panel-header">
            <div>
              <h2>
                {editingId ? "Edit Property" : "Add New Property"}
              </h2>
              <p>Enter property details</p>
            </div>

            <button
              className="form-close-button"
              onClick={() => {
                setEditingId(null);
                setShowForm(false);
              }}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleAddProperty}>
            <div className="property-form-grid">
              <div className="admin-form-group">
                <label>Property Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter property name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Property Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Plot</option>
                  <option>House</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Available</option>
                  <option>Sold</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="admin-add-button"
            >
              {editingId ? "Update Property" : "Add Property"}
            </button>
          </form>
        </section>
      )}

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h2>All Properties</h2>
            <p>View and manage property listings</p>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {properties.map((property) => (
                <tr key={property.id}>
                  <td>{property.id}</td>
                  <td>{property.name}</td>
                  <td>{property.type}</td>
                  <td>{property.price}</td>

                  <td>
                    <span
                      className={`property-status ${
                        property.status === "Available"
                          ? "available"
                          : "sold"
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>

                  <td>
                    <div className="property-actions">

                      {/* View */}
                      <button
                        onClick={() => {
                          alert(
                            `Property: ${property.name}\nType: ${property.type}\nPrice: ${property.price}\nStatus: ${property.status}`
                          );
                        }}
                      >
                        View
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => {
                          const selectedProperty = properties.find(
                            (item) => item.id === property.id
                          );

                          setEditingId(property.id);

                          setFormData({
                            name: selectedProperty.name,
                            type: selectedProperty.type,
                            price: selectedProperty.price,
                            status: selectedProperty.status,
                          });

                          setShowForm(true);
                        }}
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        className="delete-action"
                        onClick={() => {
                          setProperties(
                            properties.filter(
                              (item) => item.id !== property.id
                            )
                          );
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
    </div>
  );
}

export default AdminProperties;