import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { forgotPassword } from "../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const response = await forgotPassword(email);
      setSuccess(true);
      
      // In development, show the debug link if available
      if (response.debug_link) {
        console.log("Debug reset link:", response.debug_link);
      }
      
    } catch (err) {
      setError(err.error || "Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="d-flex align-items-center justify-content-center min-vh-100 bg-dark"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "12px" }}>
          <h3 className="text-center text-primary fw-bold">Forgot Password</h3>
          <p className="text-center text-muted">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          
          {error && (
            <motion.div 
              className="alert alert-danger"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div 
              className="alert alert-success"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <strong>Email sent successfully!</strong><br />
              Please check your email inbox for the password reset link. 
              The link will expire in 1 hour.
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-muted">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading || success}
              />
            </div>
            
            <motion.button 
              type="submit" 
              className="btn btn-primary w-100 mt-3"
              disabled={loading || success}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </form>
          
          <div className="text-center mt-4">
            <Link to="/login" className="text-primary fw-bold me-3">
              <i className="bi bi-arrow-left me-1"></i>
              Back to Login
            </Link>
            <Link to="/" className="text-primary fw-bold">
              <i className="bi bi-house me-1"></i>
              Home
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPassword; 