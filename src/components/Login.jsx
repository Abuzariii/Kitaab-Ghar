"use client";

import React, { useState } from "react";

export default function Login() {
  const [username_or_email, setUsername_or_email] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username_or_email.trim()) {
      setError("Username_or_email is required.");
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
        body: JSON.stringify({ username_or_email, password }),
      });
      if (response.status == 200) {
        const data = await response.json();
        console.log(data);

        setSuccess("Logged in successfully!");
        setUsername_or_email("");
        setPassword("");
      } else {
        setError(response.data.error || "An error occurred.");
      }
    } catch (error) {
      console.error("API error:", error);
      setError("An error occurred. Please try again later.");
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <label htmlFor="username_or_email">Username_or_email or email:</label>
      <input
        type="text"
        id="username_or_email"
        name="username_or_email"
        value={username_or_email}
        onChange={(e) => setUsername_or_email(e.target.value)}
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
        Sign Up
      </button>
    </form>
  );
}
