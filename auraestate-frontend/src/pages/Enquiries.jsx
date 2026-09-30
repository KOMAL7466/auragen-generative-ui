import Navbar from "../components/Navbar";
import { Mail, Clock } from "lucide-react";

export default function Enquiries() {
  const enquiries = JSON.parse(
    localStorage.getItem(
      "auraestate_enquiries"
    ) || "[]"
  );

  return (
    <>
      <Navbar />

      <main className="page-container">
        <div className="page-header">
          <p className="small-label">
            COMMUNICATION
          </p>

          <h1>My Enquiries</h1>

          <p>
            Track the properties you've contacted us
            about.
          </p>
        </div>

        {enquiries.length ? (
          <div className="enquiry-list">
            {enquiries.map((item) => (
              <div
                className="enquiry-card"
                key={item.id}
              >
                <div className="enquiry-icon">
                  <Mail />
                </div>

                <div>
                  <h3>{item.propertyTitle}</h3>

                  <p>
                    <Clock size={14} />
                    {new Date(
                      item.date
                    ).toLocaleDateString()}
                  </p>
                </div>

                <span className="status-badge">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No enquiries yet</h2>
            <p>
              When you enquire about a property,
              you'll see it here.
            </p>
          </div>
        )}
      </main>
    </>
  );
}