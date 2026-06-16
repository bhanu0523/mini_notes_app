import React from "react";

function Navbar({
  darkMode,
  setDarkMode,
}) {
  return (
    <nav className="navbar">
      <h2>Mini Notes</h2>

      <button
        className="theme-btn"
        onClick={() =>
          setDarkMode(!darkMode)
        }
      >
        {darkMode
          ? "☀ Light"
          : "🌙 Dark"}
      </button>
    </nav>
  );
}

export default Navbar;