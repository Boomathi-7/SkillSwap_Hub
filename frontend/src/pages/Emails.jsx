import React, { useEffect, useState } from "react";
import api from "../services/api.jsx";

export default function Emails() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    api.get("/invites/emails").then(res => setEmails(res.data));
  }, []);

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto" }}>
      <h2>📧 Simulated Emails</h2>

      {emails.length === 0 && <p>No emails yet</p>}

      {emails.map((mail, i) => (
        <div key={i} style={card}>
          {mail}
        </div>
      ))}
    </div>
  );
}

const card = {
  border: "1px solid #ccc",
  padding: "10px",
  marginBottom: "8px",
  borderRadius: "6px",
  background: "#fafafa"
};
