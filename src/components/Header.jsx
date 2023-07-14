import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <header className="Header">
      <h1>Note it...</h1>
      <button className="logout-button" onClick={props.handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Header;
