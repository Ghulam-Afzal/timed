import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="nav-container">
      <nav>
        <div className="logo">
          <Link to="/" className="logo-link">
            <div>TIMED</div>
          </Link>
        </div>
        <ul
          className="nav-links"
          style={{ transform: open ? "translateX(0px)" : "translateX(-500px)" }}
        >
          <li>
            <Link to="/countdown" className="link">
              <span>Countdown</span>
            </Link>
          </li>
          <li>
            <Link to="/animedoro" className="link">
              <span>Animedoro</span>
            </Link>
          </li>
          <li>
            <Link to="/stopwatch" className="link">
              <span>Stopwatch</span>
            </Link>
          </li>
          <li>
            <Link to="/signup" >
              <span className="nav-button">Sign Up</span>
            </Link>
          </li>
        </ul>
        <FaBars onClick={() => setOpen(!open)} className="burger" />
      </nav>
    </div>
  );
}
