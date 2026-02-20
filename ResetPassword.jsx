import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { resetPassword, verifyResetToken } from "../services/authService";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (!tokenFromUrl) {
      setError("Invalid reset link. Please request a new password reset.");
      setVerifying(false);
      return;
    }

    setToken(tokenFromUrl);
    verifyToken(tokenFromUrl);
  }, [searchParams]);

  const verifyToken = async (tokenToVerify) => {
    try {
      const response = await verifyResetToken(tokenToVerify);
      setEmail(response.email);
      setVerifying(false);
    } catch (err) {
      setError(err.error || "Invalid or expired reset token. Please request a new one.");
      setVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      await resetPassword(token, newPassword);
      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (err) {
      setError(err.error || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <motion.div
        className="d-flex align-items-center justify-content-center min-vh-100 bg-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card shadow-lg p-4 text-center" style={{ width: "400px", borderRadius: "12px" }}>
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Verifying reset token...</p>
        </div>
      </motion.div>
    );
  }

  if (success) {
    return (
      <motion.div
        className="d-flex align-items-center justify-content-center min-vh-100 bg-dark"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card shadow-lg p-4 text-center" style={{ width: "400px", borderRadius: "12px" }}>
          <div className="text-success mb-3">
            <i className="bi bi-check-circle-fill" style={{ fontSize: "3rem" }}></i>
          </div>
          <h3 className="text-success fw-bold">Password Reset Successful!</h3>
          <p className="text-muted">
            Your password has been reset successfully. You will be redirected to the login page in a few seconds.
          </p>
          <Link to="/login" className="btn btn-primary">
            Go to Login
          </Link>
        </div>
      </motion.div>
    );
  }

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
          <h3 className="text-center text-primary fw-bold">Reset Password</h3>
          <p className="text-center text-muted">
            Enter your new password for the account: <strong>{email}</strong>
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
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3 position-relative">
              <label className="form-label text-muted">New Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength="8"
                />
                <motion.button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  whileTap={{ scale: 0.9 }}
                  disabled={loading}
                >
                  {showPassword ? "🙈" : "👁️"}
                </motion.button>
              </div>
              <small className="text-muted">Password must be at least 8 characters long</small>
            </div>

            <div className="mb-3 position-relative">
              <label className="form-label text-muted">Confirm New Password</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <motion.button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  whileTap={{ scale: 0.9 }}
                  disabled={loading}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </motion.button>
              </div>
            </div>
            
            <motion.button 
              type="submit" 
              className="btn btn-primary w-100 mt-3"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </motion.button>
          </form>
          
          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-primary fw-bold me-3">
              <i className="bi bi-arrow-left me-1"></i>
              Request New Link
            </Link>
            <Link to="/login" className="text-primary fw-bold">
              <i className="bi bi-box-arrow-in-right me-1"></i>
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResetPassword; 