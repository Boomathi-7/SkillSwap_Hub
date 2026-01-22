// Shared styles for the application
export const colors = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  success: "#10b981",
  danger: "#ef4444",
  warning: "#f59e0b",
  gray: "#6b7280",
  lightGray: "#f3f4f6",
  darkGray: "#1f2937",
  border: "#e5e7eb"
};

export const globalStyles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    minHeight: "100vh"
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    border: `1px solid ${colors.border}`,
    transition: "box-shadow 0.3s ease"
  },
  button: {
    primary: {
      background: colors.primary,
      color: "#fff",
      padding: "10px 20px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      transition: "all 0.3s ease",
      "&:hover": {
        background: colors.secondary,
        transform: "translateY(-2px)"
      }
    },
    secondary: {
      background: colors.lightGray,
      color: colors.darkGray,
      padding: "10px 20px",
      border: `1px solid ${colors.border}`,
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      transition: "all 0.3s ease"
    },
    success: {
      background: colors.success,
      color: "#fff",
      padding: "10px 20px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      transition: "all 0.3s ease"
    }
  },
  input: {
    padding: "12px",
    border: `1px solid ${colors.border}`,
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "inherit",
    transition: "border-color 0.3s ease",
    "&:focus": {
      outline: "none",
      borderColor: colors.primary,
      boxShadow: `0 0 0 3px rgba(99, 102, 241, 0.1)`
    }
  },
  heading: {
    h1: {
      fontSize: "32px",
      fontWeight: "700",
      color: colors.darkGray,
      marginBottom: "8px"
    },
    h2: {
      fontSize: "24px",
      fontWeight: "700",
      color: colors.darkGray,
      marginBottom: "16px"
    },
    h3: {
      fontSize: "18px",
      fontWeight: "600",
      color: colors.darkGray,
      marginBottom: "12px"
    }
  }
};
