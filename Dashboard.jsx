import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const dashboardStats = [
    {
      title: "Detection Accuracy",
      value: "98.5%",
      icon: "🎯",
      color: "primary",
      description: "Our AI model's accuracy rate"
    },
    {
      title: "Processed Texts",
      value: "10,000+",
      icon: "📊",
      color: "success",
      description: "Texts analyzed successfully"
    },
    {
      title: "Response Time",
      value: "< 2s",
      icon: "⚡",
      color: "warning",
      description: "Average detection time"
    },
    {
      title: "Active Users",
      value: "5,000+",
      icon: "👥",
      color: "info",
      description: "Users using our platform"
    }
  ];

  const quickActions = [
    {
      title: "Detect Hate Speech",
      description: "Analyze text or upload files for hate speech detection",
      icon: "🔍",
      link: "/detection",
      color: "primary"
    },
    {
      title: "View Profile",
      description: "Manage your account settings and preferences",
      icon: "👤",
      link: "/profile",
      color: "success"
    },
    {
      title: "Change Password",
      description: "Update your account password for security",
      icon: "🔒",
      link: "/changepassword",
      color: "warning"
    },
    {
      title: "Contact Support",
      description: "Get help from our support team",
      icon: "💬",
      link: "/contactus",
      color: "info"
    }
  ];

  const recentFeatures = [
    {
      title: "Multi-format Support",
      description: "Now supports .txt, .pdf, and .docx files",
      date: "Latest"
    },
    {
      title: "Real-time Analysis",
      description: "Instant hate speech detection with detailed insights",
      date: "v2.1"
    },
    {
      title: "Enhanced Security",
      description: "Improved authentication and data protection",
      date: "v2.0"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />

      {/* Welcome Section */}
      <motion.section
        className="py-5 bg-gradient-primary text-white"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">
                Welcome back, {user?.username || 'User'}! 👋
              </h1>
              <p className="lead mb-4">
                Ready to analyze content for hate speech? Use our AI-powered detection system to keep your digital spaces safe and inclusive.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/detection" className="btn btn-light btn-lg me-3">
                  Start Detection
                </Link>
              </motion.div>
            </div>
            <div className="col-lg-4 text-center">
              <div className="display-1">🤖</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-5 bg-light"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container">
          <h2 className="text-center mb-5">Platform Statistics</h2>
          <div className="row">
            {dashboardStats.map((stat, index) => (
              <motion.div
                key={index}
                className="col-md-3 col-sm-6 mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="display-4 mb-3">{stat.icon}</div>
                    <h3 className={`text-${stat.color} fw-bold`}>{stat.value}</h3>
                    <h6 className="card-title">{stat.title}</h6>
                    <p className="card-text text-muted small">{stat.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Quick Actions Section */}
      <motion.section
        className="py-5"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="container">
          <h2 className="text-center mb-5">Quick Actions</h2>
          <div className="row">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                className="col-lg-3 col-md-6 mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link to={action.link} className="text-decoration-none">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body text-center p-4">
                        <div className="display-4 mb-3">{action.icon}</div>
                        <h5 className="card-title text-dark">{action.title}</h5>
                        <p className="card-text text-muted">{action.description}</p>
                        <div className={`btn btn-outline-${action.color} btn-sm`}>
                          Go to {action.title}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Recent Features Section */}
      <motion.section
        className="py-5 bg-light"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2 className="mb-4">Recent Features & Updates</h2>
              {recentFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="card border-0 shadow-sm mb-3"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="card-title mb-1">{feature.title}</h6>
                        <p className="card-text text-muted mb-0">{feature.description}</p>
                      </div>
                      <span className="badge bg-primary">{feature.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Need Help?</h5>
                  <p className="card-text text-muted">
                    Our support team is here to help you with any questions or issues.
                  </p>
                  <Link to="/contactus" className="btn btn-primary">
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </motion.div>
  );
};

export default Dashboard; 