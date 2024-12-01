import React, { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Signup failed: ${response.status}`);
      }

      setSuccess("Signup successful! You can now log in.");
      setError(null);
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Signup failed. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
            />
          </label>
        </div>
        {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
        {success && <div style={{ color: "green", marginBottom: "1rem" }}>{success}</div>}
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
