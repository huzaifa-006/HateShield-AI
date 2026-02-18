import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { motion } from "framer-motion";
import Login from "../pages/Login";
import Register from "../pages/Register";


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [modalType, setModalType] = useState("null");

  const handleLogout = async () => {
    try {
      // First navigate to home page
      navigate("/");
      
      // Then perform logout
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/");
    }
  };

  return (
    <>
      <motion.nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Hate Speech Detector
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {!user && (
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
              )}

              {user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/detection">
                      Detection
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/contactus">
                      Contact Us
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/aboutus">
                      About Us
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <motion.a
                      className="nav-link dropdown-toggle d-flex align-items-center"
                      href="#"
                      id="profileDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
                        alt="User Avatar"
                        className="rounded-circle me-2"
                        style={{ width: "35px", height: "35px" }}
                      />
                      {user.username}
                    </motion.a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          <i className="bi bi-person me-2"></i>
                          View Profile
                        </Link>
                      </li>

                      <li>
                        <Link className="dropdown-item" to="/changepassword">
                          <i className="bi bi-key me-2"></i>
                          Change Password
                        </Link>
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={handleLogout}
                        >
                          <i className="bi bi-box-arrow-right me-2"></i>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/aboutus">
                      About Us
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/contactus">
                      Contact Us
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;