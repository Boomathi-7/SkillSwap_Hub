import React, { useEffect, useState } from "react";
import api from "../services/api.jsx";

const colors = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  success: "#10b981",
  warning: "#f59e0b",
  gray: "#6b7280",
  lightGray: "#f3f4f6",
  darkGray: "#1f2937",
  border: "#e5e7eb"
};

export default function Invites() {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/invites")
      .then(res => {
        setInvites(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Invite fetch error:", err);
        setInvites([]);
        setLoading(false);
      });
  }, []);

  const acceptInvite = async (inviteId) => {
    try {
      await api.post(`/invites/accept/${inviteId}`);
      alert("✅ Invite accepted!");
      setInvites(invites.filter(i => i.id !== inviteId));
    } catch (err) {
      alert("⚠️ Error accepting invite");
    }
  };

  if (loading) {
    return <div style={styles.container}><p style={styles.loading}>Loading invites...</p></div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.h1}>📨 Pending Invites</h1>
        <p style={styles.subtitle}>Manage skill swap requests from other users</p>
      </div>

      {invites.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No pending invites yet. Check the matches page to send invites!</p>
        </div>
      ) : (
        <div style={styles.gridContainer}>
          {invites.map(invite => (
            <div key={invite.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.h3}>{invite.senderName}</h3>
              </div>
              <div style={styles.cardContent}>
                <p style={styles.infoItem}>
                  <strong>📧 Email:</strong> <a href={`mailto:${invite.senderEmail}`} style={styles.link}>{invite.senderEmail}</a>
                </p>
                
                <p style={styles.infoItem}>
                  <strong>💪 Can Teach:</strong>
                </p>
                <div style={styles.skillsContainer}>
                  {invite.senderSkills && invite.senderSkills.length > 0 ? (
                    invite.senderSkills.map((skill, idx) => (
                      <span key={idx} style={styles.skillBadge}>{skill}</span>
                    ))
                  ) : (
                    <span style={styles.emptySkill}>Not specified</span>
                  )}
                </div>

                <p style={styles.statusBadge}>
                  Status: <span style={styles.pendingBadge}>{invite.status}</span>
                </p>
              </div>
              
              <button
                style={styles.acceptBtn}
                onClick={() => acceptInvite(invite.id)}
              >
                ✓ Accept Invite
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
  h3: { fontSize: "18px", fontWeight: "600", color: "#fff", margin: 0 },
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
    padding: "20px"
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
  statusBadge: {
    marginTop: "16px",
    paddingTop: "16px",
    borderTop: `1px solid ${colors.border}`
  },
  pendingBadge: {
    background: colors.warning,
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "600"
  },
  acceptBtn: {
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
