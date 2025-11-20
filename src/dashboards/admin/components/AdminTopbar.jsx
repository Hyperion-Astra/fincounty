import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AdminTopbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const admin = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  return (
    <div style={styles.topbar}>
      {/* Mobile Sidebar Toggle */}
      <button
        style={styles.menuBtn}
        className="admin-menu-btn"
        onClick={onToggleSidebar}
      >
        ☰
      </button>

      <h3 style={styles.title}>Admin Panel</h3>

      <div style={styles.right}>
        <div style={styles.avatar}>
          {admin?.email?.charAt(0)?.toUpperCase() || "A"}
        </div>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  topbar: {
    width: "100%",
    height: "60px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e5e5",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 20,
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#444",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  avatar: {
    width: "36px",
    height: "36px",
    background: "#6c63ff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "600",
    fontSize: "16px",
  },
  logoutBtn: {
    padding: "6px 14px",
    background: "#ff4b4b",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  menuBtn: {
    fontSize: "22px",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "none",
  },
  // Add media query for mobile menu button
  '@media (max-width: 768px)': {
    menuBtn: {
      display: "block",
    },
  },
};

// Add default export
export default AdminTopbar;
