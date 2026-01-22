import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    qualification: "",
    email: "",
    mobile: "",
    password: "",
    skillsHave: "",
    skillsNeed: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const register = async () => {
    // Validation
    if (!form.name || !form.email || !form.password || !form.mobile) {
      setError("Please fill in all required fields");
      return;
    }

    if (!form.skillsHave.trim() || !form.skillsNeed.trim()) {
      setError("Please specify skills you have and need");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", {
        ...form,
        skillsHave: form.skillsHave.split(",").map(s => s.trim()).filter(s => s),
        skillsNeed: form.skillsNeed.split(",").map(s => s.trim()).filter(s => s)
      });
      alert("✅ Account created successfully!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      register();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.content}>
          <div style={styles.header}>
            <h1 style={styles.logo}>🚀 Skill Swap Hub</h1>
            <p style={styles.subtitle}>Join our community and start learning</p>
          </div>

          <div style={styles.formContainer}>
            <h2 style={styles.h2}>Create Your Account</h2>
            <p style={styles.formSubtitle}>Share your skills and learn new ones</p>

            {error && (
              <div style={styles.errorBox}>
                <span>⚠️ {error}</span>
              </div>
            )}

            <div style={styles.gridForm}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  style={styles.input}
                  disabled={loading}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  style={styles.input}
                  disabled={loading}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  placeholder="e.g., Software Engineer"
                  value={form.qualification}
                  onChange={handleChange}
                  style={styles.input}
                  disabled={loading}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="+1 234 567 8900"
                  value={form.mobile}
                  onChange={handleChange}
                  style={styles.input}
                  disabled={loading}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  style={styles.input}
                  disabled={loading}
                />
              </div>

              <div style={styles.fullWidth}>
                <label style={styles.label}>Skills You Have (comma-separated)</label>
                <input
                  type="text"
                  name="skillsHave"
                  placeholder="e.g., JavaScript, React, Python"
                  value={form.skillsHave}
                  onChange={handleChange}
                  style={styles.input}
                  disabled={loading}
                />
              </div>

              <div style={styles.fullWidth}>
                <label style={styles.label}>Skills You Want to Learn (comma-separated)</label>
                <input
                  type="text"
                  name="skillsNeed"
                  placeholder="e.g., Design, Product Management"
                  value={form.skillsNeed}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  style={styles.input}
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={register}
              style={styles.registerBtn}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p style={styles.loginLink}>
              Already have an account? <Link to="/" style={styles.link}>Sign In</Link>
            </p>
          </div>
        </div>

        <div style={styles.features}>
          <h3 style={styles.featuresTitle}>Get Started</h3>
          <div style={styles.featuresList}>
            <div style={styles.featureItem}>
              <span style={styles.checkmark}>✓</span>
              <span>Add your skills</span>
            </div>
            <div style={styles.featureItem}>
              <span style={styles.checkmark}>✓</span>
              <span>Find matches</span>
            </div>
            <div style={styles.featureItem}>
              <span style={styles.checkmark}>✓</span>
              <span>Connect & Learn</span>
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
    maxWidth: "1000px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    alignItems: "center"
  },
  content: {},
  header: {
    color: "#fff",
    marginBottom: "40px"
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
    padding: "40px"
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
    fontSize: "14px"
  },
  gridForm: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "20px"
  },
  fullWidth: {
    gridColumn: "1 / -1"
  },
  inputGroup: {
    marginBottom: "0"
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: colors.darkGray,
    marginBottom: "6px"
  },
  input: {
    width: "100%",
    padding: "10px",
    border: `1px solid ${colors.border}`,
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "inherit",
    transition: "all 0.3s ease",
    boxSizing: "border-box"
  },
  registerBtn: {
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
    marginBottom: "16px"
  },
  loginLink: {
    textAlign: "center",
    fontSize: "14px",
    color: colors.gray,
    margin: 0
  },
  link: {
    color: colors.primary,
    textDecoration: "none",
    fontWeight: "600"
  },
  features: {
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  featuresTitle: {
    fontSize: "22px",
    fontWeight: "600",
    margin: "0 0 20px 0"
  },
  featuresList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "16px"
  },
  checkmark: {
    fontSize: "24px",
    color: colors.success
  }
};
