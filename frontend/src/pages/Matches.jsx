import React, { useEffect, useState } from "react";
import api from "../services/api.jsx";

const colors = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  success: "#10b981",
  gray: "#6b7280",
  lightGray: "#f3f4f6",
  darkGray: "#1f2937",
  border: "#e5e7eb"
};

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/matches").then(res => {
      setMatches(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    });
  }, []);

  const invite = async (id) => {
    try {
      await api.post("/invites/send", { receiverId: id });
      alert("✅ Invite sent successfully!");
    } catch {
      alert("⚠️ Invite already sent or error occurred");
    }
  };

  if (loading) {
    return <div style={styles.container}><p style={styles.loading}>Loading matches...</p></div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.h1}>🔍 Skill Matches</h1>
        <p style={styles.subtitle}>Found {matches.length} potential matches for your learning goals</p>
      </div>

      {matches.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No matches found yet. Try adding more skills to find connections!</p>
        </div>
      ) : (
        <div style={styles.gridContainer}>
          {matches.map(u => (
            <div key={u.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.h3}>{u.name}</h3>
              </div>
              <div style={styles.cardContent}>
                <p style={styles.infoItem}>
                  <strong>📍 Qualification:</strong> {u.qualification}
                </p>
                <p style={styles.infoItem}>
                  <strong>📧 Email:</strong> <a href={`mailto:${u.email}`} style={styles.link}>{u.email}</a>
                </p>
                <p style={styles.infoItem}>
                  <strong>💪 Can Teach:</strong>
                </p>
                <div style={styles.skillsContainer}>
                  {u.skillsHave && u.skillsHave.length > 0 ? (
                    u.skillsHave.map((skill, idx) => (
                      <span key={idx} style={styles.skillBadge}>{skill}</span>
                    ))
                  ) : (
                    <span style={styles.emptySkill}>Not specified</span>
                  )}
                </div>
              </div>
              <button style={styles.inviteBtn} onClick={() => invite(u.id)}>
                📨 Send Invite
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    minHeight: "100vh",
    background: `linear-gradient(135deg, ${colors.lightGray} 0%, #fff 100%)`
  },
  header: {
    marginBottom: "40px",
    textAlign: "center"
  },
  h1: { fontSize: "32px", fontWeight: "700", color: colors.darkGray, margin: "0 0 8px 0" },
  h3: { fontSize: "18px", fontWeight: "600", color: colors.darkGray, margin: 0 },
  subtitle: { fontSize: "16px", color: colors.gray, margin: "8px 0 0 0" },
  loading: { textAlign: "center", fontSize: "16px", color: colors.gray },
  emptyState: {
    background: "#fff",
    borderRadius: "12px",
    padding: "60px 20px",
    textAlign: "center",
    border: `2px dashed ${colors.border}`
  },
  emptyText: { fontSize: "16px", color: colors.gray, margin: 0 },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "24px"
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "0",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    border: `1px solid ${colors.border}`,
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  cardHeader: {
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    color: "#fff",
    padding: "20px",
    borderBottom: `1px solid ${colors.border}`
  },
  cardContent: {
    padding: "20px",
    flex: 1
  },
  infoItem: {
    margin: "12px 0",
    fontSize: "14px",
    lineHeight: "1.6"
  },
  link: {
    color: colors.primary,
    textDecoration: "none",
    fontWeight: "500"
  },
  skillsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "8px"
  },
  skillBadge: {
    background: colors.success,
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600"
  },
  emptySkill: {
    color: colors.gray,
    fontSize: "12px",
    fontStyle: "italic"
  },
  inviteBtn: {
    background: colors.success,
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "0 0 12px 12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    width: "100%",
    transition: "all 0.3s ease"
  }
};
