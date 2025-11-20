// src/dashboards/client/ClientDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import DashboardCard from "../components/DashboardCards";
import "./ClientDashboard.css";

export default function ClientDashboard() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState(0);
  const [savings, setSavings] = useState(0);
  const [loan, setLoan] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDashboard() {
      if (!user) return;

      try {
        // Load wallet, savings, loan
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setWallet(data.wallet || 0);
          setSavings(data.savings || 0);
          setLoan(data.loan || 0);
        }

        // Load recent transactions
        const txQuery = query(
          collection(db, "users", user.uid, "transactions"),
          orderBy("date", "desc"),
          limit(5)
        );
        const txSnap = await getDocs(txQuery);
        const txData = txSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTransactions(txData);
      } catch (e) {
        console.error("Dashboard load error", e);
      }

      setLoading(false);
    }

    loadDashboard();
  }, [user]);

  if (loading) return <div className="center-loading">Loading...</div>;

  return (
    <div className="client-dashboard">
      <h2 className="dashboard-title">Welcome Back!</h2>

      {/* Summary Cards */}
      <div className="dash-grid">
        <DashboardCard
          title="Wallet Balance"
          value={`$${wallet.toLocaleString()}`}
          color="primary"
        />
        <DashboardCard
          title="Savings"
          value={`$${savings.toLocaleString()}`}
          color="green"
        />
        <DashboardCard
          title="Active Loans"
          value={`$${loan.toLocaleString()}`}
          color="secondary"
        />
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
  <button onClick={() => navigate("/dashboard/transfer")}>Transfer Money</button>
  <button onClick={() => navigate("/dashboard/deposit")}>Deposit</button>
  <button onClick={() => navigate("/dashboard/apply-loan")}>Apply for Loan</button>
    <button onClick={() => navigate("/dashboard/pay-bills")}>Pay Utility Bills</button>
</div>

      {/* Recent Transactions */}
      <div className="dash-section">
        <h3>Recent Transactions</h3>
        {transactions.length === 0 ? (
          <div className="empty-state">No recent transactions</div>
        ) : (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id}>
                  <td>{new Date(tx.date.seconds * 1000).toLocaleDateString()}</td>
                  <td>{tx.type}</td>
                  <td>${tx.amount.toLocaleString()}</td>
                  <td>{tx.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
