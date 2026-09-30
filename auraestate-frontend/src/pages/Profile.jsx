import Navbar from "../components/Navbar";
import {
  User,
  Mail,
  Phone,
} from "lucide-react";
import { getCurrentUser } from "../services/api";

export default function Profile() {
  const user = getCurrentUser();

  return (
    <>
      <Navbar />

      <main className="page-container">
        <div className="page-header">
          <p className="small-label">
            ACCOUNT
          </p>

          <h1>My Profile</h1>

          <p>
            Your AURAESTATE account information.
          </p>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="profile-info">
            <h2>{user?.name}</h2>

            <div>
              <Mail size={17} />
              {user?.email}
            </div>

            <div>
              <Phone size={17} />
              {user?.phone || "Not provided"}
            </div>

            <div>
              <User size={17} />
              User Account
            </div>
          </div>
        </div>
      </main>
    </>
  );
}