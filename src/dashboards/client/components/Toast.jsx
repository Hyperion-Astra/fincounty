import React, { useEffect } from "react";
import "./Toast.css";

export default function Toast({ id, message, type = "info", onClose = () => {} }) {
  useEffect(() => {
    const t = setTimeout(() => onClose(id), 3000);
    return () => clearTimeout(t);
  }, [id, onClose]);

  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
}
