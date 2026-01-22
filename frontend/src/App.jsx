import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Matches from "./pages/Matches.jsx";
import Invites from "./pages/Invites.jsx";
import Connections from "./pages/Connections.jsx";
import Messages from "./pages/Messages.jsx";
import Emails from "./pages/Emails.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/invites" element={<Invites />} />
      <Route path="/connections" element={<Connections />} />
      <Route path="/messages/:userId" element={<Messages />} />
      <Route path="/emails" element={<Emails />} />
    </Routes>
  );
}
