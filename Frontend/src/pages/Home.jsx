import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthContext from '../context/AuthContext';
import pic1 from "../assets/a.jpg"
import pic2 from "../assets/a1.jpg"
import pic3 from "../assets/a2.jpg"
import "./Home.css";

// Starry background generator
const StarBackground = () => {
  const stars = Array.from({ length: 60 }).map((_, i) => {
    const size = Math.random() * 2 + 1.5;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = 2 + Math.random() * 2;
    return (
      <div
        key={i}
        className="star"
        style={{
          width: size,
          height: size,
          top: `${top}%`,
          left: `${left}%`,
          animationDuration: `${duration}s`,
        }}
      />
    );
  });
  return <div className="star-bg">{stars}</div>;
};

const Home = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleStartDetection = (e) => {
      e.preventDefault();
      navigate('/detection');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    };

    // Replace local images with Unsplash URLs for hero section
    const heroImages = [
      {
        url: "https://plus.unsplash.com/premium_photo-1661817214148-2d4cf768a7c3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGNvbXB1dGVyfGVufDB8MHwwfHx8MA%3D%3D", // User-provided Unsplash premium photo
        heading: "AI Moderation: Detecting Toxic Comments in Real Time",
        message: "See how our AI model flags hate and toxic language directly on your laptop, keeping your community safe.",
        button: { text: "Features", scrollTo: "features" }
      },
      {
        url: pic2,
        heading: "Spotting Harmful Words Before They Spread",
        message: "See how our system highlights and detects toxic language using advanced NLP techniques.",
        button: { text: "See Testimonials", scrollTo: "testimonials" }
      },
      {
        url: pic3,
        heading: "Empowering Moderators, Protecting Communities",
        message: "Moderators can easily flag and review hate speech, keeping online spaces safe and inclusive.",
        button: { text: "Join the Mission", scrollTo: "cta" }
      }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Navbar />

            {/* Carousel Section */}
            <div id="carouselExample" className="carousel slide mb-6 position-relative" data-bs-ride="carousel">
                {/* Overlay for better text contrast */}
                <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(30,41,59,0.32)', zIndex: 1}}></div>
                <div className="carousel-indicators" style={{zIndex: 2}}>
                    <button
                        type="button"
                        data-bs-target="#carouselExample"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExample"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExample"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                </div>
                <div className="carousel-inner" style={{zIndex: 2}}>
                    {heroImages.map((img, idx) => (
                      <div className={`carousel-item${idx === 0 ? " active" : ""}`} key={img.url}>
                        <div style={{position: 'relative'}}>
                          <img
                            src={img.url}
                            className="d-block w-100"
                            alt={img.heading}
                            style={{ height: '600px', objectFit: 'cover', objectPosition: 'center 10%', filter: 'brightness(0.92)' }}
                          />
                          <div className="container">
                            <div className="carousel-caption" style={{paddingBottom: '2.5rem'}}>
                              <h1 style={{fontSize: '3rem', fontWeight: 900, textShadow: '0 4px 24px rgba(30,41,59,0.18)', letterSpacing: '1.2px'}}>{img.heading}</h1>
                              <p className="opacity-75" style={{fontSize: '1.35rem', fontWeight: 500, textShadow: '0 2px 8px rgba(30,41,59,0.12)'}}>{img.message}</p>
                              <p>
                                <button
                                  className="btn hero-blue-btn"
                                  style={{
                                    minWidth: 120,
                                    height: 40,
                                    borderRadius: 20,
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    background: '#4f8cff',
                                    border: 'none',
                                    boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
                                    transition: 'background 0.18s, color 0.18s, transform 0.18s',
                                    textAlign: 'center',
                                    padding: 0,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                  onClick={() => document.getElementById(img.button.scrollTo).scrollIntoView({ behavior: 'smooth' })}
                                  onMouseOver={e => {e.currentTarget.style.background = '#1a237e'; e.currentTarget.style.color = '#fff';}}
                                  onMouseOut={e => {e.currentTarget.style.background = '#4f8cff'; e.currentTarget.style.color = '#fff';}}
                                >
                                  {img.button.text}
                                </button>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Hero Section */}
            <motion.section
                id="hero"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="py-5 text-center homepage-hero"
            >
                <StarBackground />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h1 className="display-4 fw-bold">Welcome to HateShield-AI</h1>
                    <p className="lead">
                        Revolutionizing social media with AI-powered real-time hate speech detection and actionable insights.
                    </p>
                    <div className="mt-4 d-flex justify-content-center">
                        {user ? (
                            <>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="me-2"
                                >
                                    <Link to="/dashboard"
                                      className="btn hero-blue-btn"
                                      style={{
                                        minWidth: 160,
                                        height: 52,
                                        borderRadius: 26,
                                        fontSize: '1.15rem',
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        background: '#4f8cff',
                                        border: 'none',
                                        boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
                                        transition: 'background 0.18s, color 0.18s, transform 0.18s',
                                        textAlign: 'center',
                                        padding: 0,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}
                                      onMouseOver={e => {e.currentTarget.style.background = '#1a237e'; e.currentTarget.style.color = '#fff';}}
                                      onMouseOut={e => {e.currentTarget.style.background = '#4f8cff'; e.currentTarget.style.color = '#fff';}}
                                    >
                                      Dashboard
                                    </Link>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <button
                                      className="btn hero-blue-btn"
                                      style={{
                                        minWidth: 160,
                                        height: 52,
                                        borderRadius: 26,
                                        fontSize: '1.15rem',
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        background: '#4f8cff',
                                        border: 'none',
                                        boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
                                        transition: 'background 0.18s, color 0.18s, transform 0.18s',
                                        textAlign: 'center',
                                        padding: 0,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}
                                      onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                                      onMouseOver={e => {e.currentTarget.style.background = '#1a237e'; e.currentTarget.style.color = '#fff';}}
                                      onMouseOut={e => {e.currentTarget.style.background = '#4f8cff'; e.currentTarget.style.color = '#fff';}}
                                    >
                                      Features
                                    </button>
                                </motion.div>
                            </>
                        ) : (
                            <>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="me-2"
                                >
                                    <Link to="/register" className="btn hero-blue-btn" style={{minWidth: 160, height: 52, borderRadius: 26, fontSize: '1.15rem', fontWeight: 'bold', color: '#fff', background: '#4f8cff', border: 'none', boxShadow: '0 4px 24px rgba(44,62,80,0.10)', transition: 'background 0.18s, color 0.18s, transform 0.18s', textAlign: 'center', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}
                                      onMouseOver={e => {e.currentTarget.style.background = '#1a237e'; e.currentTarget.style.color = '#fff';}}
                                      onMouseOut={e => {e.currentTarget.style.background = '#4f8cff'; e.currentTarget.style.color = '#fff';}}
                                    >
                                        Get Started
                                    </Link>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link to="/login" className="btn hero-blue-btn" style={{minWidth: 160, height: 52, borderRadius: 26, fontSize: '1.15rem', fontWeight: 'bold', color: '#fff', background: '#4f8cff', border: 'none', boxShadow: '0 4px 24px rgba(44,62,80,0.10)', transition: 'background 0.18s, color 0.18s, transform 0.18s', textAlign: 'center', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}
                                      onMouseOver={e => {e.currentTarget.style.background = '#1a237e'; e.currentTarget.style.color = '#fff';}}
                                      onMouseOut={e => {e.currentTarget.style.background = '#4f8cff'; e.currentTarget.style.color = '#fff';}}
                                    >
                                        Learn More
                                    </Link>
                                </motion.div>
                            </>
                        )}
                    </div>
                </div>
            </motion.section>

            {/* Features Section */}
            <motion.section
                id="features"
                className="py-5 homepage-features"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <div className="container">
                    <h2 className="text-center mb-4">Why Choose HateShield-AI?</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 text-center p-4 shadow-card">
                                <i className="bi bi-emoji-heart-eyes display-2 text-primary mb-3"></i>
                                <h4>Real-Time Detection</h4>
                                <p>
                                    Detect harmful language instantly across posts, comments, and messages.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 text-center p-4 shadow-card">
                                <i className="bi bi-chat-dots display-2 text-primary mb-3"></i>
                                <h4>Generative AI Insights</h4>
                                <p>
                                    Understand the context and sentiment behind flagged content.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 text-center p-4 shadow-card">
                                <i className="bi bi-cloud display-2 text-primary mb-3"></i>
                                <h4>Cloud-Based Platform</h4>
                                <p>
                                    Access our detection system from anywhere, anytime, with scalable cloud infrastructure.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Testimonials Section */}
            <motion.section
                id="testimonials"
                className="py-5 homepage-testimonials"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <div className="container">
                    <h2 className="text-center mb-4">What Users Say</h2>
                    <div className="row g-4">
                        <motion.div
                            className="col-md-4"
                            whileHover={{ scale: 1.025 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="card h-100 p-4 shadow-card">
                                <div className="card-body">
                                    <p className="card-text" style={{ fontSize: '1.08rem', fontWeight: 500 }}>
                                        "This tool has helped us reduce online toxicity significantly!"
                                    </p>
                                    <p className="text-muted mb-0">- Sarah</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="col-md-4"
                            whileHover={{ scale: 1.025 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="card h-100 p-4 shadow-card">
                                <div className="card-body">
                                    <p className="card-text" style={{ fontSize: '1.08rem', fontWeight: 500 }}>
                                        "It flagged harmful comments I missed, making our community safer."
                                    </p>
                                    <p className="text-muted mb-0">- John, Moderator</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="col-md-4"
                            whileHover={{ scale: 1.025 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="card h-100 p-4 shadow-card">
                                <div className="card-body">
                                    <p className="card-text" style={{ fontSize: '1.08rem', fontWeight: 500 }}>
                                        "The AI is spot-on with its analysis, and the insights are super helpful."
                                    </p>
                                    <p className="text-muted mb-0">- Emily, Content Creator</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Call to Action Section */}
            <motion.section
                id="cta"
                className="py-5 homepage-cta text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                <div className="container">
                    <h2 className="mb-4">Join the Fight Against Hate Speech</h2>
                    <p className="lead mb-4">
                        Protect your online communities and foster healthier conversations with our AI-powered solution.
                    </p>
                    {user ? (
                        <button
                          className="btn hero-blue-btn"
                          style={{minWidth: 160, height: 52, borderRadius: 26, fontSize: '1.15rem', fontWeight: 'bold', color: '#fff', background: '#4f8cff', border: 'none', boxShadow: '0 4px 24px rgba(44,62,80,0.10)', transition: 'background 0.18s, color 0.18s', textAlign: 'center', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}
                          onClick={handleStartDetection}
                          onMouseOver={e => {e.currentTarget.style.background = '#1a237e'; e.currentTarget.style.color = '#fff';}}
                          onMouseOut={e => {e.currentTarget.style.background = '#4f8cff'; e.currentTarget.style.color = '#fff';}}
                        >
                          Start Detection
                        </button>
                    ) : (
                        <Link to="/register" className="btn hero-blue-btn" style={{fontSize: '1.08rem', padding: '0.55rem 1.5rem', borderRadius: '1.2rem', fontWeight: 700, color: '#fff', background: '#4f8cff', border: 'none', boxShadow: '0 4px 24px rgba(44,62,80,0.10)', transition: 'background 0.18s, color 0.18s, transform 0.18s'}}
                          onMouseOver={e => {e.currentTarget.style.background = '#1a237e'; e.currentTarget.style.color = '#fff';}}
                          onMouseOut={e => {e.currentTarget.style.background = '#4f8cff'; e.currentTarget.style.color = '#fff';}}
                        >
                            Sign Up Now
                        </Link>
                    )}
                </div>
            </motion.section>

            {/* Footer Section */}
            <Footer />
        </motion.div>
    );
};

export default Home;
