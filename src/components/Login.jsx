"use client";

import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status == 200) {
        const data = await response.json();

        setSuccess(data.message);
        setError("");
        setEmail("");
        setPassword("");
      }
      // * If email doesn't exist
      if (response.status == 404) {
        const data = await response.json();
        setError(data.message);
      }
      // * If password doesn't match
      if (response.status == 401) {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
      <h1>Login</h1>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ display: "block", margin: "10px 0" }}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ display: "block", margin: "10px 0" }}
      />
      <button type="submit" style={{ display: "block", margin: "10px 0" }}>
        Login
      </button>
    </form>
  );
}
