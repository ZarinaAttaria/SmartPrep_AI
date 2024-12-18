import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-left">
        <img src="Interview.png" className="navbar-logo" alt="Logo" />
        <a className="navbar-brand" href="#">
          SmartPrep_AI
        </a>
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Features <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Pricing <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item getStarted-Btn">
            <a className="nav-link getStarted-link" href="#">
              Start For Free
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
