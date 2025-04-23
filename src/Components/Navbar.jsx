import React from "react";
import logo from "../assets/logo.png";
import "../css/Navbar.css";
import { useBooking } from "../BusContext/BookingContext";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { toggleTheme, theme } = useBooking();
  return (
    <>
      <nav className={`navbar navbar-expand-lg ${theme}`}>
        <div className="container-fluid">
          <Link to="/">
            {" "}
            <img src={logo} alt="logo" className="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  InterCity Clubs
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Bus Tickets
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Group Booking
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Data Room
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Punctuality
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      User Ratings
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <button
              type="button"
              className="btn signin me-5"
              onClick={toggleTheme}
            >
              {theme === "light" ? "Dark 🌑" : "Light 💡"}
            </button>
            <button type="button" className="btn btn-primary signin me-5">
              <i className="fa-solid fa-circle-user"></i> Sign In
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
