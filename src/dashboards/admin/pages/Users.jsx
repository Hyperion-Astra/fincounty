// src/dashboards/admin/pages/Users.js
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/UserService";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return (
    <div className="admin-page">
      <h2 className="dashboard-title">All Users</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Wallet</th>
            <th>Joined</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>${u.wallet?.toLocaleString()}</td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
