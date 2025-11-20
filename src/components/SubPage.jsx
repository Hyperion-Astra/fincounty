// src/components/Subpage.jsx
import React from "react";
import { useLocation } from "react-router-dom";

function niceTitleFromPath(path){
  // simple formatter: /personal/checking-accounts -> Checking Accounts
  const parts = path.split("/").filter(Boolean);
  if(parts.length === 0) return "Home";
  const last = parts[parts.length-1];
  return last.replace(/-/g, " ").replace(/\b\w/g, c=>c.toUpperCase());
}

export default function Subpage(){
  const loc = useLocation();
  const title = niceTitleFromPath(loc.pathname);
  return (
    <main style={{ padding: "40px 5%" }}>
      <div style={{ marginBottom: 18 }}>
        <div style={{ color:"#94a3b8", fontSize:14 }}>You Are Here: {loc.pathname}</div>
        <h1 style={{ marginTop:6 }}>{title}</h1>
      </div>

      <section style={{ maxWidth:1000, background:"#fff", padding:20, borderRadius:12, boxShadow:"var(--shadow)" }}>
        <h3 style={{ marginTop:0 }}>{title}</h3>
        <p style={{ color:"#64748b" }}>
          This is a placeholder page for <strong>{title}</strong>. Replace this paragraph with page-specific
          content (benefits, product details, CTAs). If you want, I can auto-generate professional copy
          for each page now.
        </p>

        <div style={{ marginTop:18 }}>
          <h4>Quick links</h4>
          <ul>
            <li><a href="#">Learn more about this product</a></li>
            <li><a href="#">Apply now</a></li>
            <li><a href="#">Contact our specialists</a></li>
          </ul>
        </div>
      </section>
    </main>
  );
}
