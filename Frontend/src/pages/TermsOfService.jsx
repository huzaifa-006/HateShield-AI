import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
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
                            <h1 className="h3 mb-0">Terms of Service</h1>
                            <p className="mb-0">Last updated: {new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="card-body">
                            <div className="mb-4">
                                <h2 className="h4 text-primary">1. Acceptance of Terms</h2>
                                <p>
                                    By accessing and using Hate Speech Detection AI, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">2. Description of Service</h2>
                                <p>
                                    Hate Speech Detection AI is an AI-powered platform that analyzes text content to identify potential hate speech, offensive language, and discriminatory content. Our service provides:
                                </p>
                                <ul>
                                    <li>Real-time text analysis for hate speech detection</li>
                                    <li>Detailed analysis reports with confidence scores</li>
                                    <li>User feedback and rating system</li>
                                    <li>Account management and profile features</li>
                                </ul>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">3. User Accounts</h2>
                                <h3 className="h5">3.1 Registration</h3>
                                <p>
                                    To access certain features, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
                                </p>

                                <h3 className="h5">3.2 Account Security</h3>
                                <p>
                                    You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                                </p>

                                <h3 className="h5">3.3 Account Termination</h3>
                                <p>
                                    We reserve the right to terminate or suspend your account at any time for violations of these terms or for any other reason at our sole discretion.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">4. Acceptable Use</h2>
                                <h3 className="h5">4.1 Permitted Use</h3>
                                <p>You may use our service for:</p>
                                <ul>
                                    <li>Analyzing text content for hate speech detection</li>
                                    <li>Educational and research purposes</li>
                                    <li>Content moderation and safety</li>
                                    <li>Personal and professional content analysis</li>
                                </ul>

                                <h3 className="h5">4.2 Prohibited Use</h3>
                                <p>You agree not to:</p>
                                <ul>
                                    <li>Submit malicious, harmful, or illegal content</li>
                                    <li>Attempt to circumvent our security measures</li>
                                    <li>Use the service for spam or harassment</li>
                                    <li>Reverse engineer or attempt to extract our AI models</li>
                                    <li>Use the service for commercial purposes without permission</li>
                                    <li>Violate any applicable laws or regulations</li>
                                </ul>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">5. Content and Data</h2>
                                <h3 className="h5">5.1 User Content</h3>
                                <p>
                                    You retain ownership of content you submit for analysis. By using our service, you grant us a limited license to process your content for hate speech detection and service improvement.
                                </p>

                                <h3 className="h5">5.2 Data Processing</h3>
                                <p>
                                    We process your data in accordance with our Privacy Policy. Detection results and anonymized data may be used to improve our AI models and algorithms.
                                </p>

                                <h3 className="h5">5.3 Content Responsibility</h3>
                                <p>
                                    You are solely responsible for the content you submit for analysis. We do not endorse, support, or verify the accuracy of user-submitted content.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">6. Service Availability</h2>
                                <p>
                                    We strive to maintain high service availability but do not guarantee uninterrupted access. We may temporarily suspend the service for maintenance, updates, or technical issues.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">7. Disclaimers</h2>
                                <h3 className="h5">7.1 AI Accuracy</h3>
                                <p>
                                    Our AI models provide analysis based on training data and algorithms. While we strive for accuracy, results are not guaranteed and should not be considered as definitive legal or professional advice.
                                </p>

                                <h3 className="h5">7.2 Service Limitations</h3>
                                <p>
                                    The service is provided "as is" without warranties of any kind. We disclaim all warranties, express or implied, including but not limited to accuracy, reliability, and fitness for a particular purpose.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">8. Limitation of Liability</h2>
                                <p>
                                    In no event shall Hate Speech Detection AI be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of the service.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">9. Intellectual Property</h2>
                                <p>
                                    The service, including its content, features, and functionality, is owned by Hate Speech Detection AI and is protected by copyright, trademark, and other intellectual property laws.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">10. Privacy</h2>
                                <p>
                                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">11. Modifications</h2>
                                <p>
                                    We reserve the right to modify these terms at any time. We will notify users of material changes by posting the updated terms on this page and updating the "Last updated" date.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">12. Governing Law</h2>
                                <p>
                                    These terms shall be governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions.
                                </p>
                            </div>

                            <div className="mb-4">
                                <h2 className="h4 text-primary">13. Contact Information</h2>
                                <p>
                                    If you have any questions about these Terms of Service, please contact us:
                                </p>
                                <ul>
                                    <li>Email: legal@hatespeechdetection.com</li>
                                    <li>Address: UIIT, PMAS Arid Agriculture University, Rawalpindi</li>
                                    <li>Phone: +92 (341) 5310-800</li>
                                </ul>
                            </div>

                            <div className="text-center mt-5">
                                <Link to="/" className="btn btn-primary me-3">
                                    <i className="bi bi-house-fill me-2"></i>
                                    Back to Home
                                </Link>
                                <Link to="/privacy-policy" className="btn btn-outline-primary">
                                    <i className="bi bi-shield-check me-2"></i>
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default TermsOfService; 