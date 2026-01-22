import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.jsx";

const colors = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  danger: "#ef4444",
  success: "#10b981",
  gray: "#6b7280",
  lightGray: "#f3f4f6",
  darkGray: "#1f2937",
  border: "#e5e7eb"
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={styles.logo}>🚀 Skill Swap Hub</h1>
          <p style={styles.subtitle}>Exchange Skills, Grow Together</p>
        </div>

        <div style={styles.formContainer}>
          <h2 style={styles.h2}>Welcome Back</h2>
          <p style={styles.formSubtitle}>Sign in to your account</p>

          {error && (
            <div style={styles.errorBox}>
              <span style={styles.errorIcon}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              style={styles.input}
              disabled={loading}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              style={styles.input}
              disabled={loading}
            />
          </div>

          <button
            type="button"
            onClick={login}
            style={styles.loginBtn}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div style={styles.divider}>
            <span>Don't have an account?</span>
          </div>

          <Link to="/register" style={{ textDecoration: "none" }}>
            <button style={styles.registerBtn}>
              Create Account
            </button>
          </Link>

          <Link to="/forgot-password" style={styles.forgotLink}>
            Forgot password?
          </Link>
        </div>

        <div style={styles.features}>
          <h3 style={styles.featuresTitle}>Why Join Us?</h3>
          <div style={styles.featuresList}>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>🎯</span>
              <span>Find skill matches</span>
            </div>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>💬</span>
              <span>Connect with learners</span>
            </div>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>📈</span>
              <span>Grow your skills</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "inherit"
  },
  wrapper: {
    width: "100%",
    maxWidth: "900px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    alignItems: "center"
  },
  header: {
    color: "#fff",
    textAlign: "left"
  },
  logo: {
    fontSize: "36px",
    fontWeight: "700",
    margin: "0 0 8px 0",
    color: "#fff"
  },
  subtitle: {
    fontSize: "18px",
    color: "rgba(255,255,255,0.9)",
    margin: 0
  },
  formContainer: {
    background: "#fff",
    borderRadius: "16px",
    padding: "40px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
  },
  h2: {
    fontSize: "28px",
    fontWeight: "700",
    color: colors.darkGray,
    margin: "0 0 4px 0"
  },
  formSubtitle: {
    fontSize: "14px",
    color: colors.gray,
    margin: "0 0 24px 0"
  },
  errorBox: {
    background: "#fee2e2",
    border: `1px solid ${colors.danger}`,
    color: colors.danger,
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px"
  },
  errorIcon: {
    fontSize: "16px"
  },
  inputGroup: {
    marginBottom: "20px"
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: colors.darkGray,
    marginBottom: "8px"
  },
  input: {
    width: "100%",
    padding: "12px",
    border: `1px solid ${colors.border}`,
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "inherit",
    transition: "all 0.3s ease",
    boxSizing: "border-box"
  },
  loginBtn: {
    width: "100%",
    padding: "12px",
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "12px"
  },
  divider: {
    textAlign: "center",
    margin: "24px 0",
    fontSize: "14px",
    color: colors.gray
  },
  registerBtn: {
    width: "100%",
    padding: "12px",
    background: colors.lightGray,
    color: colors.darkGray,
    border: `1px solid ${colors.border}`,
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },
  forgotLink: {
    display: "block",
    textAlign: "center",
    marginTop: "16px",
    fontSize: "14px",
    color: colors.primary,
    textDecoration: "none",
    fontWeight: "500"
  },
  features: {
    color: "#fff"
  },
  featuresTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 16px 0"
  },
  featuresList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "14px"
  },
  featureIcon: {
    fontSize: "20px"
  }
};
