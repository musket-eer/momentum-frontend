import React, { useState } from "react";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Reset password failed: ${response.status}`);
      }

      setSuccess("Password reset link sent to your email!");
      setError(null);
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("Failed to send password reset email. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
            />
          </label>
        </div>
        {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
        {success && <div style={{ color: "green", marginBottom: "1rem" }}>{success}</div>}
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
