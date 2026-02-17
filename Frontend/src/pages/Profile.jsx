import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      {/* Profile Header */}
      <motion.section
        className="py-5 text-center bg-dark text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">My Profile</h1>
          <p className="lead">Manage your account details and preferences.</p>
        </div>
      </motion.section>

      {/* Profile Details */}
      <motion.section
        className="py-5"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <motion.img
                src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
                alt="User Avatar"
                className="rounded-circle mb-3"
                style={{ width: "120px", height: "120px" }}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <h2>{user.username}</h2>
              <p className="text-muted">{user.email}</p>
              <hr />
              <div className="text-start">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>User ID:</strong> {user.id}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default Profile;
