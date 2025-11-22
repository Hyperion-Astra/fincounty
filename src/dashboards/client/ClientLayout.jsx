// src/dashboards/client/ClientLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import ClientSidebar from "./components/ClientSidebar";
import ClientTopbar from "./components/ClientTopbar";
import "./client.css";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../components/Spinner.jsx";

export default function ClientLayout() {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!currentUser) return <div>Please log in</div>;

  return (
    <div className="client-layout">
      <ClientSidebar />

      <div className="client-main">
        <ClientTopbar user={userProfile} />
        <div className="client-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
