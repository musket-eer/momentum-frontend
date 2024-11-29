import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ marginBottom: "1rem" }}>
      <Link to="/startup" style={{ marginRight: "1rem" }}>Startup</Link>
      <Link to="/dashboard" style={{ marginRight: "1rem" }}>Dashboard</Link>
      <Link to="/reflection">Reflection</Link>
    </nav>
  );
};

export default Navbar;
