"use client";

import React, { useState } from "react";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password strength
    if (!validatePassword(password)) {
      setError(
        "Ensure password is 8 chars long and have both lower & upper case chars"
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, username, email, password }),
      });
      if (response.status == 200) {
        const data = await response.json();
        console.log(data);

        setSuccess("User created successfully!");
        // setUsername("");
        // setFullName("");
        // setEmail("");
        // setPassword("");
        // setConfirmPassword("");
      } else {
        setError(response.data);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <label htmlFor="fullName">Full Name:</label>
      <input
        type="text"
        id="fullName"
        name="fullName"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        style={{ display: "block", margin: "10px 0" }}
      />
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ display: "block", margin: "10px 0" }}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
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
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        style={{ display: "block", margin: "10px 0" }}
      />
      <button type="submit" style={{ display: "block", margin: "10px 0" }}>
        Sign Up
      </button>
    </form>
  );
};

export default Signup;

// * Helper Functions
const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+-=]{8,}$/;
  return regex.test(password);
};
