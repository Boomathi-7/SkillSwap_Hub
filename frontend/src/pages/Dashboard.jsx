import React, { useEffect, useState } from "react";
import api from "../services/api.jsx";
import { Link, useNavigate } from "react-router-dom";

const colors = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  danger: "#ef4444",
  gray: "#6b7280",
  lightGray: "#f3f4f6",
  darkGray: "#1f2937",
  border: "#e5e7eb"
};

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [hoverNotifId, setHoverNotifId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const userRes = await api.get("/user/me");
        setUser(userRes.data);
      } catch {
        localStorage.removeItem("token");
        navigate("/");
        return;
      }

      try {
        const notifRes = await api.get("/notifications");
        setNotifications(Array.isArray(notifRes.data) ? notifRes.data : []);
      } catch {
        setNotifications([]);
      }

      try {
        const msgRes = await api.get("/messages/recent/all");
        console.log("Messages response:", msgRes.data);
        setMessages(Array.isArray(msgRes.data) ? msgRes.data : []);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      }
    };

    loadData();
  }, []);

  if (!user) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Welcome, {user.name}! 👋</h1>
        <p style={styles.subtitle}>Skill Swap Hub - Connect & Grow Together</p>
      </div>

      {notifications.length > 0 && (
        <div style={styles.notificationBox}>
          <h3 style={styles.notificationTitle}>🔔 Recent Notifications</h3>
          {notifications.slice(0, 3).map(n => (
            <div 
              key={n.id} 
              style={styles.notification}
              onMouseEnter={() => setHoverNotifId(n.id)}
              onMouseLeave={() => setHoverNotifId(null)}
            >
              <span>{n.message}</span>
              <span style={styles.timestamp}>
                {new Date(n.createdAt).toLocaleDateString()}
              </span>
              <button
                style={{
                  ...styles.closeBtn,
                  color: hoverNotifId === n.id ? colors.primary : colors.gray
                }}
                onClick={() => {
                  api.put(`/notifications/${n.id}/read`).catch(err => 
                    console.error("Error dismissing notification:", err)
                  );
                  setNotifications(notifications.filter(notif => notif.id !== n.id));
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {messages.length > 0 && (
        <div style={styles.messageBox}>
          <h3 style={styles.messageTitle}>💬 Recent Messages</h3>
          {messages.slice(0, 3).map(msg => (
            <Link 
              key={msg.id} 
              to={`/messages/${msg.sender.id}`}
              style={{ textDecoration: "none" }}
            >
              <div style={styles.messageItem}>
                <span style={styles.messageSender}>{msg.sender.name}</span>
                <span style={styles.messagePreview}>{msg.content.substring(0, 40)}...</span>
                <span style={styles.messageTime}>
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div style={styles.gridContainer}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.h3}>👤 Profile Information</h2>
          </div>
          <div style={styles.cardContent}>
            <div style={styles.infoRow}>
              <span style={styles.label}>Email:</span>
              <span>{user.email}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Qualification:</span>
              <span>{user.qualification}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Mobile:</span>
              <span>{user.mobile}</span>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.h3}>💪 Skills I Can Teach</h2>
          </div>
          <div style={styles.cardContent}>
            {user.skillsHave && user.skillsHave.length > 0 ? (
              <div style={styles.skillsContainer}>
                {user.skillsHave.map((skill, idx) => (
                  <span key={idx} style={styles.skillBadge}>{skill}</span>
                ))}
              </div>
            ) : (
              <p style={{ color: colors.gray }}>No skills added yet</p>
            )}
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.h3}>🎯 Skills I Want to Learn</h2>
          </div>
          <div style={styles.cardContent}>
            {user.skillsNeed && user.skillsNeed.length > 0 ? (
              <div style={styles.skillsContainer}>
                {user.skillsNeed.map((skill, idx) => (
                  <span key={idx} style={styles.skillBadgeNeed}>{skill}</span>
                ))}
              </div>
            ) : (
              <p style={{ color: colors.gray }}>No skills needed yet</p>
            )}
          </div>
        </div>
      </div>

      <div style={styles.ctaSection}>
        <h2 style={{ ...styles.h2, color: "#fff", marginBottom: "8px" }}>Ready to Start Learning?</h2>
        <p style={styles.ctaText}>Find skill matches and connect with other learners</p>
        
        <div style={styles.actionButtons}>
          <Link to="/matches" style={{ textDecoration: "none" }}>
            <button style={styles.primaryBtn}>🔍 Explore Matches</button>
          </Link>
          <Link to="/connections" style={{ textDecoration: "none" }}>
            <button style={styles.primaryBtn}>🤝 My Connections</button>
          </Link>
          <Link to="/invites" style={{ textDecoration: "none" }}>
            <button style={styles.secondaryBtn}>📨 View Invites</button>
          </Link>
          <button
            style={styles.logoutBtn}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
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
  loading: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    color: colors.gray
  },
  header: {
    marginBottom: "40px",
    textAlign: "center"
  },
  h1: { fontSize: "32px", fontWeight: "700", color: colors.darkGray, margin: "0 0 8px 0" },
  h2: { fontSize: "24px", fontWeight: "700", color: colors.darkGray, margin: "0 0 16px 0" },
  h3: { fontSize: "18px", fontWeight: "600", color: colors.darkGray, margin: 0 },
  subtitle: { fontSize: "16px", color: colors.gray, margin: "8px 0 0 0" },
  notificationBox: {
    background: "#dbeafe",
    border: `2px solid ${colors.primary}`,
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "30px"
  },
  notificationTitle: {
    margin: "0 0 12px 0",
    color: colors.primary,
    fontSize: "16px",
    fontWeight: "600"
  },
  notification: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: `1px solid rgba(99, 102, 241, 0.1)`,
    alignItems: "center"
  },
  timestamp: { fontSize: "12px", color: colors.gray },
  closeBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    padding: "0 8px",
    transition: "color 0.2s ease"
  },
  messageBox: {
    background: "#fce7f3",
    border: `2px solid ${colors.secondary}`,
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "30px"
  },
  messageTitle: {
    margin: "0 0 12px 0",
    color: colors.secondary,
    fontSize: "16px",
    fontWeight: "600"
  },
  messageItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: `1px solid rgba(139, 92, 246, 0.1)`,
    alignItems: "center",
    transition: "background 0.2s ease",
    cursor: "pointer",
    "&:hover": {
      background: "rgba(139, 92, 246, 0.05)"
    }
  },
  messageSender: {
    fontWeight: "600",
    color: colors.secondary,
    minWidth: "100px"
  },
  messagePreview: {
    fontSize: "13px",
    color: colors.gray,
    flex: 1,
    marginLeft: "12px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  messageTime: {
    fontSize: "12px",
    color: colors.gray,
    minWidth: "80px",
    textAlign: "right"
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px",
    marginBottom: "40px"
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    border: `1px solid ${colors.border}`,
    transition: "box-shadow 0.3s ease"
  },
  cardHeader: {
    paddingBottom: "16px",
    borderBottom: `1px solid ${colors.border}`,
    marginBottom: "16px"
  },
  cardContent: { fontSize: "14px" },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: `1px solid ${colors.border}`
  },
  label: { fontWeight: "600", color: colors.darkGray },
  skillsContainer: { display: "flex", flexWrap: "wrap", gap: "8px" },
  skillBadge: {
    background: colors.primary,
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600"
  },
  skillBadgeNeed: {
    background: colors.secondary,
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600"
  },
  ctaSection: {
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    color: "#fff",
    textAlign: "center",
    borderRadius: "12px",
    padding: "40px 24px",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
  },
  ctaText: { fontSize: "16px", marginBottom: "24px", opacity: 0.95 },
  actionButtons: { display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" },
  primaryBtn: {
    background: "#fff",
    color: colors.primary,
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease"
  },
  secondaryBtn: {
    background: "rgba(255,255,255,0.2)",
    color: "#fff",
    padding: "12px 24px",
    border: "2px solid #fff",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease"
  },
  logoutBtn: {
    background: colors.danger,
    color: "#fff",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease"
  }
};
