import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "./UserList.css";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const snap = await getDocs(collection(db, "users"));
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      <h3>All users</h3>
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>KYC</th><th>Created</th></tr></thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.displayName}</td>
              <td>{u.email}</td>
              <td>{u.role || "user"}</td>
              <td>{u.kycStatus || "none"}</td>
              <td>{u.createdAt?.toDate?.()?.toLocaleDateString?.() || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
