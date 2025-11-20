import React from "react";

/* A few content sections to fill the page — placeholder text and images */
export default function HomeSections(){
  return (
    <>
      <section style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,marginBottom:28}}>
        <div style={{background:"#fff",padding:20,borderRadius:12,boxShadow:"var(--shadow)"}}>
          <h3>Checking Accounts</h3>
          <p style={{color:"#64748b"}}>No monthly fees on our standard checking account, with online banking and mobile deposit.</p>
          <a href="#">Learn More →</a>
        </div>
        <div style={{background:"#fff",padding:20,borderRadius:12,boxShadow:"var(--shadow)"}}>
          <h3>Savings & CDs</h3>
          <p style={{color:"#64748b"}}>Competitive savings rates and a range of CD terms to help you grow your balance safely.</p>
          <a href="#">Rates & Terms →</a>
        </div>
        <div style={{background:"#fff",padding:20,borderRadius:12,boxShadow:"var(--shadow)"}}>
          <h3>Business Banking</h3>
          <p style={{color:"#64748b"}}>Business checking, merchant services, and tailored loan solutions for local businesses.</p>
          <a href="#">Business Solutions →</a>
        </div>
      </section>

      <section style={{display:"flex",gap:18,alignItems:"center",marginBottom:28}}>
        <img src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8a6f2a8a2e7f8b8c7d6c8e0f6e8b7d1a" alt="mortgage" style={{width:420, borderRadius:12, boxShadow:"var(--shadow)"}}/>
        <div style={{flex:1}}>
          <h3>Home Loans Built for You</h3>
          <p style={{color:"#64748b"}}>From pre-approval to closing, our mortgage specialists walk you through each step with clear options and personalized rates.</p>
          <a href="#" style={{display:"inline-block",marginTop:8, padding:"10px 14px", background:"#0f6b8c", color:"#fff", borderRadius:8}}>View Mortgage Rates</a>
        </div>
      </section>

      <section style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:40}}>
        <div style={{background:"#fff",padding:20,borderRadius:12,boxShadow:"var(--shadow)"}}>
          <h4>Latest News</h4>
          <article style={{marginTop:8}}>
            <h5>Community Grants Announced</h5>
            <p style={{color:"#64748b"}}>Fincounty is proud to announce new community grants aimed at small business growth in our region.</p>
            <a href="#">Read more →</a>
          </article>
        </div>
        <div style={{background:"#fff",padding:20,borderRadius:12,boxShadow:"var(--shadow)"}}>
          <h4>Customer Resources</h4>
          <p style={{color:"#64748b"}}>Helpful guides on home buying, saving, and managing your accounts online.</p>
          <a href="#">Explore Resources →</a>
        </div>
      </section>
    </>
  );
}
