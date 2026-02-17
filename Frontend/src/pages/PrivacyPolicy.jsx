import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <motion.div
            className="container mt-5 mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <motion.div
                        className="card shadow-lg"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="card-header bg-primary text-white">
                            <h1 className="h3 mb-0">Privacy Policy</h1>
                            <p className="mb-0">Last updated: {new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="card-body">
                            <div className="mb-4">
                                <h2 className="h4 text-primary">1. Introduction</h2>
                                <p>
                                    Welcome to Hate Speech Detection AI. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our hate speech detection platform.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">2. Information We Collect</h2>
                                <h3 className="h5">2.1 Personal Information</h3>
                                <ul>
                                    <li>Name and email address when you register</li>
                                    <li>Profile information you provide</li>
                                    <li>Account credentials and authentication data</li>
                                </ul>

                                <h3 className="h5">2.2 Usage Information</h3>
                                <ul>
                                    <li>Text content submitted for hate speech detection</li>
                                    <li>Detection results and analysis data</li>
                                    <li>User feedback and ratings</li>
                                    <li>Usage patterns and interaction data</li>
                                </ul>

                                <h3 className="h5">2.3 Technical Information</h3>
                                <ul>
                                    <li>IP address and device information</li>
                                    <li>Browser type and version</li>
                                    <li>Operating system</li>
                                    <li>Access timestamps</li>
                                </ul>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">3. How We Use Your Information</h2>
                                <ul>
                                    <li>Provide hate speech detection services</li>
                                    <li>Improve our AI models and algorithms</li>
                                    <li>Process user feedback and ratings</li>
                                    <li>Maintain and secure your account</li>
                                    <li>Send important service updates</li>
                                    <li>Analyze usage patterns for service improvement</li>
                                </ul>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">4. Data Security</h2>
                                <p>
                                    We implement industry-standard security measures to protect your information:
                                </p>
                                <ul>
                                    <li>Encryption of data in transit and at rest</li>
                                    <li>Secure authentication and authorization</li>
                                    <li>Regular security audits and updates</li>
                                    <li>Access controls and monitoring</li>
                                </ul>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">5. Data Retention</h2>
                                <p>
                                    We retain your information only as long as necessary to provide our services and comply with legal obligations. Detection results and feedback may be retained for model improvement purposes, but personal identifiers are removed or anonymized.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">6. Third-Party Services</h2>
                                <p>
                                    We may use third-party services for hosting, analytics, and security. These services are bound by their own privacy policies and our data processing agreements.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">7. Your Rights</h2>
                                <p>You have the right to:</p>
                                <ul>
                                    <li>Access your personal information</li>
                                    <li>Correct inaccurate data</li>
                                    <li>Request deletion of your data</li>
                                    <li>Opt-out of certain communications</li>
                                    <li>Export your data</li>
                                </ul>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">8. Cookies and Tracking</h2>
                                <p>
                                    We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. You can control cookie settings through your browser preferences.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">9. Children's Privacy</h2>
                                <p>
                                    Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">10. Changes to This Policy</h2>
                                <p>
                                    We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">11. Contact Us</h2>
                                <p>
                                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                                </p>
                                <ul>
                                    <li>Email: privacy@hatespeechdetection.com</li>
                                    <li>Address: UIIT, PMAS Arid Agriculture University, Rawalpindi</li>
                                    <li>Phone: +92-3346971121</li>
                                </ul>
                            </div>

                            <div className="text-center mt-5">
                                <Link to="/" className="btn btn-primary me-3">
                                    <i className="bi bi-house-fill me-2"></i>
                                    Back to Home
                                </Link>
                                <Link to="/contactus" className="btn btn-outline-primary">
                                    <i className="bi bi-envelope-fill me-2"></i>
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default PrivacyPolicy; 