import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <motion.footer
            className="py-4 bg-dark text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
        >
            <div className="container">
                <div className="row">
            
                    <div className="col-md-4 mb-4">
                        <h5>About Hate Speech Detection AI</h5>
                        <p>
                            Hate Speech Detection AI is an AI-powered platform designed to help individuals and organizations identify and filter harmful, offensive, or discriminatory speech online in real-time, fostering a safer digital environment.
                        </p>
                    </div>

                    <div className="col-md-4 mb-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/aboutus" className="text-white text-decoration-none">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contactus" className="text-white text-decoration-none">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy-policy" className="text-white text-decoration-none">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-white text-decoration-none">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-4 mb-4">
                        <h5>Contact Us</h5>
                        <ul className="list-unstyled">
                            <li>
                                <i className="bi bi-geo-alt-fill me-2"></i>
                                UIIT ,PMAS Arid Agriculture University , Rawalpindi
                            </li>
                            <li>
                                <i className="bi bi-envelope-fill me-2"></i>
                                <a href="mailto:info@hatespeechdetection.com" className="text-white text-decoration-none">
                                    contact@hatespeechdetection.com
                                </a>
                            </li>
                            <li>
                                <i className="bi bi-phone-fill me-2"></i>
                                <a href="tel:+1234567890" className="text-white text-decoration-none">
                                    +92 (341) 5310-800
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <p className="mb-0">
                        &copy; {new Date().getFullYear()} Hate Speech Detection AI. All rights reserved.
                    </p>
                   
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
