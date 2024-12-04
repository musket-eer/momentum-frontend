import React, { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }

      const result = await response.json();
      console.log("Login successful:", result);
      setError(null);
    } catch (error) {
      console.error("Error during login:", error);
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h1>Login</h1>
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
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
