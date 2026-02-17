import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { motion } from "framer-motion"; 
import { loginUser,testApi } from "../services/authService";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      let payload = { username, password };
      const response = await loginUser(payload);
      login(response); 
      
      // Navigate to the intended destination or dashboard
      navigate(from, { replace: true });
    } catch (err) {
      setError("Invalid username or password");
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
          <h3 className="text-center text-primary fw-bold">Welcome Back!</h3>
          <p className="text-center text-muted">Login to Hate Speech Detector</p>
          
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
            <div className="mb-3">
              <label className="form-label text-muted">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3 position-relative">
              <label className="form-label text-muted">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"} 
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
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
              <div className="text-end mt-1">
                <Link to="/forgot-password" className="text-primary text-decoration-none small">
                  Forgot Password?
                </Link>
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
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </motion.button>
          </form>
          
          <p className="text-center mt-3">
            Don't have an account? <Link to="/register" className="text-primary fw-bold">Register</Link>
          </p>
          <p className="text-center">
            <Link to="/" className="text-primary fw-bold">Back to Home</Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
