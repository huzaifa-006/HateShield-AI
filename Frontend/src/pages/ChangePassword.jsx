import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { changePassword } from "../services/authService";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear message when user starts typing
    if (message.text) {
      setMessage({ type: "", text: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match!" });
      return;
    }

    if (formData.newPassword.length < 8) {
      setMessage({ type: "error", text: "New password must be at least 8 characters long!" });
      return;
    }

    if (formData.oldPassword === formData.newPassword) {
      setMessage({ type: "error", text: "New password must be different from the old password!" });
      return;
    }

    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      const response = await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword
      });

      setMessage({ type: "success", text: response.message || "Password changed successfully!" });
      
      // Clear form on success
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });

    } catch (error) {
      console.error("Change password error:", error);
      const errorMessage = error.error || error.message || "Failed to change password. Please try again.";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }

    // Clear message after 5 seconds
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="py-5 text-center bg-dark text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">Change Password</h1>
          <p className="lead">Ensure your account security by updating your password.</p>
        </div>
      </motion.section>

      {/* Change Password Form */}
      <motion.section
        className="py-5"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              {message.text && (
                <motion.div
                  className={`alert ${
                    message.type === "success" ? "alert-success" : "alert-danger"
                  } text-center`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {message.text}
                </motion.div>
              )}
              
              <div className="card shadow">
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Current Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your current password"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your new password (min 8 characters)"
                        minLength="8"
                      />
                      <div className="form-text">
                        Password must be at least 8 characters long
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label fw-bold">Confirm New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Confirm your new password"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="btn btn-primary w-100"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Updating Password...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </motion.button>
                  </form>
                </div>
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

export default ChangePassword;
