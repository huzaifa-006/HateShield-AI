import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthContext from '../context/AuthContext';
import pic1 from "../assets/a.jpg"
import pic2 from "../assets/a1.jpg"
import pic3 from "../assets/a2.jpg"

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Navbar />

            {/* Carousel Section */}
            <div id="carouselExample" className="carousel slide mb-6" data-bs-ride="carousel">
                <div className="carousel-indicators">
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
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src={pic1}
                            className="d-block w-100"
                            alt="Hate Speech Detection"
                            style={{ height: '600px', objectFit: 'cover' }}
                        />
                        <div className="container">
                            <div className="carousel-caption">
                                <h1>Combat Hate Speech</h1>
                                <p className="opacity-75">
                                    Our AI system instantly detects hate speech across social platforms and communities.
                                </p>
                                <p>
                                    {user ? (
                                        <Link to="/detection" className="btn btn-lg btn-primary">
                                            Start Detection
                                        </Link>
                                    ) : (
                                        <Link to="/register" className="btn btn-lg btn-primary">
                                            Try It Now
                                        </Link>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img
                            src={pic2}
                            className="d-block w-100"
                            alt="Sentiment Analysis"
                            style={{ height: '600px', objectFit: 'cover' }}
                        />
                        <div className="container">
                            <div className="carousel-caption">
                                <h1>AI-Powered Insights</h1>
                                <p>
                                    Detect harmful content and gain real-time analysis and context.
                                </p>
                                <p>
                                    {user ? (
                                        <Link to="/dashboard" className="btn btn-lg btn-primary">
                                            Go to Dashboard
                                        </Link>
                                    ) : (
                                        <Link to="/login" className="btn btn-lg btn-primary">
                                            Learn More
                                        </Link>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img
                            src={pic3}
                            className="d-block w-100"
                            alt="Promote Healthy Discussions"
                            style={{ height: '600px', objectFit: 'cover' }}
                        />
                        <div className="container">
                            <div className="carousel-caption">
                                <h1>Promote Healthy Discussions</h1>
                                <p>
                                    Mitigate online toxicity with our proactive hate speech detection.
                                </p>
                                <p>
                                    <Link to="/aboutus" className="btn btn-lg btn-primary">
                                        Discover How
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
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
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="py-5 text-center bg-primary text-white"
            >
                <div className="container">
                    <h1 className="display-4 fw-bold">Welcome to Hate Speech Detection AI</h1>
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
                                    <Link to="/dashboard" className="btn btn-light btn-lg">
                                        Go to Dashboard
                                    </Link>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link to="/detection" className="btn btn-outline-light btn-lg">
                                        Start Detection
                                    </Link>
                                </motion.div>
                            </>
                        ) : (
                            <>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="me-2"
                                >
                                    <Link to="/register" className="btn btn-light btn-lg">
                                        Get Started
                                    </Link>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link to="/login" className="btn btn-outline-light btn-lg">
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
                className="py-5 bg-light"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <div className="container">
                    <h2 className="text-center mb-4">Why Choose Hate Speech Detection?</h2>
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <i className="bi bi-emoji-heart-eyes display-2 text-primary"></i>
                            <h4>Real-Time Detection</h4>
                            <p>
                                Detect harmful language instantly across posts, comments, and messages.
                            </p>
                        </div>
                        <div className="col-md-4 text-center">
                            <i className="bi bi-chat-dots display-2 text-primary"></i>
                            <h4>Generative AI Insights</h4>
                            <p>
                                Understand the context and sentiment behind flagged content.
                            </p>
                        </div>
                        <div className="col-md-4 text-center">
                            <i className="bi bi-cloud display-2 text-primary"></i>
                            <h4>Cloud-Based Platform</h4>
                            <p>
                                Access our detection system from anywhere, anytime, with scalable cloud infrastructure.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Testimonials Section */}
            <motion.section
                className="py-5"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <div className="container">
                    <h2 className="text-center mb-4">What Users Say</h2>
                    <div className="row">
                        <motion.div
                            className="col-md-4"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="card h-100">
                                <div className="card-body">
                                    <p className="card-text">
                                        "This tool has helped us reduce online toxicity significantly!"
                                    </p>
                                    <p className="text-muted">- Sarah</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="col-md-4"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="card h-100">
                                <div className="card-body">
                                    <p className="card-text">
                                        "It flagged harmful comments I missed, making our community safer."
                                    </p>
                                    <p className="text-muted">- John, Moderator</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="col-md-4"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="card h-100">
                                <div className="card-body">
                                    <p className="card-text">
                                        "The AI is spot-on with its analysis, and the insights are super helpful."
                                    </p>
                                    <p className="text-muted">- Emily, Content Creator</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Call to Action Section */}
            <motion.section
                className="py-5 bg-primary text-white text-center"
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
                        <Link to="/detection" className="btn btn-light btn-lg">
                            Start Detection
                        </Link>
                    ) : (
                        <Link to="/register" className="btn btn-light btn-lg">
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
