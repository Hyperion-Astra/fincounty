import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import "./Saving.css";

export default function Saving() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;

  const starterPlans = [
    { id: "savings_emergency", name: "Emergency Fund", balance: 0, goal: 2000 },
    { id: "savings_vacation", name: "Vacation Fund", balance: 0, goal: 1500 },
    { id: "savings_gadget", name: "Gadget Fund", balance: 0, goal: 1000 },
  ];

  const [accounts, setAccounts] = useState([]);
  const [activePlan, setActivePlan] = useState(null); // Plan user clicked
  const [showNewPlanForm, setShowNewPlanForm] = useState(false);
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanGoal, setNewPlanGoal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!uid) return;

      try {
        const accRef = doc(db, "accounts", uid);
        const snap = await getDoc(accRef);
        if (snap.exists() && snap.data().savingsPlans) {
          setAccounts(snap.data().savingsPlans);
        } else {
          setAccounts(starterPlans);
        }
      } catch (err) {
        console.error("Error loading savings plans:", err);
        setAccounts(starterPlans);
      }
    };
    fetchAccounts();
  }, [uid]);

  const handlePlanClick = (plan) => {
    setActivePlan(plan);
    setStartDate("");
    setEndDate("");
    setMessage("");
  };

  const handleSavePlanSettings = async () => {
    if (!startDate || !endDate) {
      setMessage("Please select both start and end dates.");
      return;
    }

    const updatedPlans = accounts.map((plan) =>
      plan.id === activePlan.id ? { ...plan, startDate, endDate } : plan
    );

    setAccounts(updatedPlans);

    try {
      const accRef = doc(db, "accounts", uid);
      await updateDoc(accRef, { savingsPlans: updatedPlans });
      setMessage("Plan updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update plan.");
    }

    setActivePlan(null);
  };

  const handleAddNewPlan = async () => {
    if (!newPlanName || !newPlanGoal || Number(newPlanGoal) <= 0) {
      setMessage("Enter valid plan name and goal.");
      return;
    }

    const newPlan = {
      id: `plan_${Date.now()}`,
      name: newPlanName,
      balance: 0,
      goal: Number(newPlanGoal),
    };

    const updatedPlans = [...accounts, newPlan];
    setAccounts(updatedPlans);

    try {
      const accRef = doc(db, "accounts", uid);
      await updateDoc(accRef, { savingsPlans: updatedPlans });
      setMessage("New savings plan created!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to create plan.");
    }

    setNewPlanName("");
    setNewPlanGoal("");
    setShowNewPlanForm(false);
  };

  return (
    <div className="savings-container">
      <h2>Savings Plans</h2>
      {message && <p className="savings-message">{message}</p>}

      <div className="savings-cards">
        {accounts.map((plan) => {
          const progress = Math.min((plan.balance / plan.goal) * 100, 100);
          return (
            <div
              key={plan.id}
              className="savings-card clickable"
              onClick={() => handlePlanClick(plan)}
            >
              <h3>{plan.name}</h3>
              <p>Balance: ${plan.balance.toFixed(2)}</p>
              <p>Goal: ${plan.goal.toFixed(2)}</p>
              {plan.startDate && plan.endDate && (
                <p>Duration: {plan.startDate} → {plan.endDate}</p>
              )}
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="progress-text">{progress.toFixed(0)}% of goal</p>
            </div>
          );
        })}

        {/* New Plan Card */}
        <div
          className="savings-card new-plan"
          onClick={() => setShowNewPlanForm(!showNewPlanForm)}
        >
          {showNewPlanForm ? (
            <div className="new-plan-form">
              <input
                type="text"
                placeholder="Plan Name"
                value={newPlanName}
                onChange={(e) => setNewPlanName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Goal Amount"
                value={newPlanGoal}
                onChange={(e) => setNewPlanGoal(e.target.value)}
              />
              <button onClick={handleAddNewPlan}>Create Plan</button>
            </div>
          ) : (
            <div className="plus-icon">+ New Plan</div>
          )}
        </div>
      </div>

      {/* Inline Plan Settings */}
      {activePlan && (
        <div className="plan-settings">
          <h3>Update "{activePlan.name}"</h3>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button onClick={handleSavePlanSettings}>Save</button>
          <button className="cancel-btn" onClick={() => setActivePlan(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
