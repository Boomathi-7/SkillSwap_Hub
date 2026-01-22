import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api.jsx";

const colors = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  success: "#10b981",
  danger: "#ef4444",
  gray: "#6b7280",
  lightGray: "#f3f4f6",
  darkGray: "#1f2937",
  border: "#e5e7eb"
};

export default function Messages() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [recipientName, setRecipientName] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        // Get current user
        const userRes = await api.get("/user/me");
        setCurrentUserId(userRes.data.id);

        // Get messages
        const messagesRes = await api.get(`/messages/${userId}`);
        setMessages(Array.isArray(messagesRes.data) ? messagesRes.data : []);

        // Mark unread messages from this user as read
        if (Array.isArray(messagesRes.data)) {
          messagesRes.data.forEach(msg => {
            if (!msg.isRead && msg.senderId === Number(userId)) {
              api.put(`/messages/${msg.id}/read`).catch(err => 
                console.error("Error marking message as read:", err)
              );
            }
          });
        }

        // Get recipient name
        if (messagesRes.data.length > 0) {
          const firstMessage = messagesRes.data[0];
          const recipient = firstMessage.senderId === userRes.data.id 
            ? firstMessage.receiver 
            : firstMessage.sender;
          setRecipientName(recipient.name);
        } else {
          // Fetch user details if no messages
          const recipientRes = await api.get(`/user/me`); // This won't work, need different endpoint
          setRecipientName("User");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error loading messages:", err);
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await api.post("/messages/send", {
        receiverId: userId,
        content: newMessage
      });

      setMessages([...messages, response.data]);
      setNewMessage("");

      // Auto scroll to bottom
      setTimeout(() => {
        const messagesContainer = document.getElementById("messagesContainer");
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }, 0);
    } catch (err) {
      alert("Error sending message");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return <div style={styles.container}><p style={styles.loading}>Loading messages...</p></div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate("/connections")} style={styles.backBtn}>
          ← Back
        </button>
        <h1 style={styles.h1}>💬 Chat with {recipientName}</h1>
      </div>

      <div style={styles.messageBox}>
        <div style={styles.messagesContainer} id="messagesContainer">
          {messages.length === 0 ? (
            <div style={styles.emptyMessages}>
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.message,
                  ...(msg.senderId === currentUserId ? styles.sentMessage : styles.receivedMessage)
                }}
              >
                <p style={styles.messageContent}>{msg.content}</p>
                <span style={styles.timestamp}>
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>
            ))
          )}
        </div>

        <div style={styles.inputArea}>
          <textarea
            style={styles.input}
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            rows="3"
          />
          <button
            onClick={handleSendMessage}
            style={styles.sendBtn}
            disabled={!newMessage.trim()}
          >
            📨 Send
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    height: "100vh",
    background: `linear-gradient(135deg, ${colors.lightGray} 0%, #fff 100%)`,
    display: "flex",
    flexDirection: "column"
  },
  header: {
    marginBottom: "20px"
  },
  backBtn: {
    background: colors.lightGray,
    border: `1px solid ${colors.border}`,
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "12px",
    transition: "all 0.3s ease"
  },
  h1: { fontSize: "28px", fontWeight: "700", color: colors.darkGray, margin: 0 },
  messageBox: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflow: "hidden",
    border: `1px solid ${colors.border}`
  },
  messagesContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  emptyMessages: {
    textAlign: "center",
    color: colors.gray,
    margin: "auto"
  },
  message: {
    maxWidth: "70%",
    padding: "12px 16px",
    borderRadius: "12px",
    wordWrap: "break-word"
  },
  sentMessage: {
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    color: "#fff",
    alignSelf: "flex-end"
  },
  receivedMessage: {
    background: colors.lightGray,
    color: colors.darkGray,
    alignSelf: "flex-start"
  },
  messageContent: {
    margin: "0 0 4px 0",
    fontSize: "14px"
  },
  timestamp: {
    fontSize: "12px",
    opacity: 0.7
  },
  inputArea: {
    padding: "16px",
    borderTop: `1px solid ${colors.border}`,
    display: "flex",
    gap: "12px"
  },
  input: {
    flex: 1,
    padding: "12px",
    border: `1px solid ${colors.border}`,
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "inherit",
    resize: "none"
  },
  sendBtn: {
    background: colors.primary,
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease"
  },
  loading: { textAlign: "center", fontSize: "16px", color: colors.gray }
};
