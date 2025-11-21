import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import KYCApprovals from "./KYCApprovals";
import DepositApprovals from "./DepositApprovals";
import TransactionLogs from "./TransactionLogs";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [tab, setTab] = useState("users");

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <h2>Admin Panel</h2>
        <div className="tabs">
          <button className={tab==="users"?'active':''} onClick={()=>setTab("users")}>Users</button>
          <button className={tab==="kyc"?'active':''} onClick={()=>setTab("kyc")}>KYC</button>
          <button className={tab==="deposits"?'active':''} onClick={()=>setTab("deposits")}>Deposits</button>
          <button className={tab==="logs"?'active':''} onClick={()=>setTab("logs")}>Logs</button>
        </div>
      </header>

      <main className="admin-main">
        {tab === "users" && <UserList />}
        {tab === "kyc" && <KYCApprovals />}
        {tab === "deposits" && <DepositApprovals />}
        {tab === "logs" && <TransactionLogs />}
      </main>
    </div>
  );
}
