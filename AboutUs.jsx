import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <>
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
            <h1 className="display-4 fw-bold">About Hate Speech Detection</h1>
            <p className="lead">
              Revolutionizing social media with AI-powered real-time hate speech detection and actionable insights.
            </p>
          </div>
        </motion.section>

        {/* About Content */}
        <motion.section
          className="py-5"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="container">
            <h2 className="text-center mb-4">Who We Are</h2>
            <p className="text-center">
              Hate Speech Detection AI is an advanced platform created to address the growing concern of online hate speech and toxicity. Using cutting-edge artificial intelligence, including natural language processing (NLP) and sentiment analysis, we aim to identify, flag, and mitigate harmful content in real-time. Our mission is to support social media platforms, online communities, and content creators in fostering a safer, more inclusive digital environment. Through accurate detection and actionable insights, we strive to reduce the impact of hate speech and promote healthier interactions online.
            </p>
           </div>
        </motion.section>

        {/* Our Mission */}
        <motion.section
          className="py-5 bg-light"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="container text-center">
            <h2 className="mb-4">Our Mission</h2>
            <p>
              Our mission is to empower social media platforms and online communities with cutting-edge AI tools to detect hate speech early, reduce online toxicity, and foster healthier online discussions. We aim to bridge the gap between technology and social harmony.
            </p>
          </div>
        </motion.section>

        {/* Our Team Section */}
        <motion.section
          className="py-5"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="container">
            <h2 className="text-center mb-4">Our Team</h2>
            <div className="row">
              {/* Team Member 1 */}
              <motion.div
                className="col-md-4 text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="team-member-card">
                  <i className="bi bi-person-circle display-2 text-primary"></i>
                  <h4 className="mt-3">SARFARAZ ALI KHAN</h4>
                  <p><strong>AI Engineer</strong></p>
                  <p>
                    Sarfaraz Ali Khan is a full-stack developer with expertise in front-end and back-end technologies.
                    He leads the development of user-friendly applications and integrates AI-powered systems to combat hate speech.
                  </p>
                </div>
              </motion.div>

              {/* Team Member 2 */}
              <motion.div
                className="col-md-4 text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="team-member-card">
                  <i className="bi bi-person-circle display-2 text-primary"></i>
                  <h4 className="mt-3">PARVEEN KOUSAR</h4>
                  <p><strong>AI Specialist</strong></p>
                  <p>
                    She specializes in AI algorithms, particularly in natural language processing and sentiment analysis,
                    with a focus on detecting hate speech and harmful content in online conversations.
                  </p>
                </div>
              </motion.div>

              {/* Team Member 3 */}
              <motion.div
                className="col-md-4 text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="team-member-card">
                  <i className="bi bi-person-circle display-2 text-primary"></i>
                  <h4 className="mt-3">MUHAMMAD HUZAIFA SHAFIQ</h4>
                  <p><strong>Web Developer</strong></p>
                  <p>
                    He is responsible for cloud infrastructure, ensuring our platform is scalable and
                    accessible from anywhere, anytime, with high availability for real-time hate speech monitoring.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="py-5 bg-primary text-white text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="container">
            <h2 className="mb-4">Join Hate Speech Detection Today!</h2>
            <p className="lead">Help create safer online communities with AI-powered hate speech detection.</p>
          </div>
        </motion.section>

        <Footer />
      </motion.div>
    </>
  );
};

export default AboutUs;
