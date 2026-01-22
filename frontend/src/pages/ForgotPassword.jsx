import React, { useState } from "react";
import api from "../services/api.jsx";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const resetPassword = async () => {
    try {
      await api.post("/auth/forgot-password", { email, newPassword });
      alert("Password reset successful");
      navigate("/");
    } catch {
      alert("Email not found");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Forgot Password</h2>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="New Password"
        onChange={e => setNewPassword(e.target.value)}
      />

      <button onClick={resetPassword}>Reset Password</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "60px auto",
    textAlign: "center"
  }
};
