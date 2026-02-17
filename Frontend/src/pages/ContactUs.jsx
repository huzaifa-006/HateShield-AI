import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { submitContactForm } from '../services/contactService';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting form data:', formData); // Debug log
      const response = await submitContactForm(formData);
      console.log('Server response:', response); // Debug log
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error); // Debug log
    } finally {
      setIsSubmitting(false);
    }
  };

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
          id="hero"
          className="py-5 text-center homepage-hero"
        >
          <div className="container">
            <h1 className="display-4 fw-bold">Contact Us</h1>
            <p className="lead">
              We'd love to hear from you! Reach out with any questions or feedback about HateShield-AI.
            </p>
          </div>
        </motion.section>

        {/* Contact Form */}
        <motion.section
          id="contact-form"
          className="py-5"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="container">
            <h2 className="text-center mb-4">Get In Touch</h2>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Your Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows="4"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="btn btn-lg btn-primary px-5"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact Information */}
        <motion.section
          id="contact-info"
          className="py-5 homepage-cta text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="container text-center">
            <h2 className="mb-4">Our Contact Details</h2>
            <div className="row">
              <motion.div
                className="col-md-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="tel:+923346971121"
                  style={{
                    display: 'block',
                    background: 'rgba(40,40,50,0.08)',
                    borderRadius: '1rem',
                    padding: '2rem 1rem',
                    textAlign: 'center',
                    color: '#232a34',
                    textDecoration: 'none',
                    fontWeight: 500,
                    boxShadow: '0 2px 12px rgba(79,140,255,0.08)',
                    transition: 'background 0.2s, box-shadow 0.2s',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(79,140,255,0.10)'}
                  onMouseOut={e => e.currentTarget.style.background = 'rgba(40,40,50,0.08)'}
                >
                  <i className="bi bi-telephone-fill display-4 text-primary"></i>
                  <h4 className="mt-3">Call Us</h4>
                  <div>+92-3346971121</div>
                </a>
              </motion.div>
              <motion.div
                className="col-md-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="mailto:support@hatespeechdetection.com"
                  style={{
                    display: 'block',
                    background: 'rgba(40,40,50,0.08)',
                    borderRadius: '1rem',
                    padding: '2rem 1rem',
                    textAlign: 'center',
                    color: '#232a34',
                    textDecoration: 'none',
                    fontWeight: 500,
                    boxShadow: '0 2px 12px rgba(79,140,255,0.08)',
                    transition: 'background 0.2s, box-shadow 0.2s',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(79,140,255,0.10)'}
                  onMouseOut={e => e.currentTarget.style.background = 'rgba(40,40,50,0.08)'}
                >
                  <i className="bi bi-envelope-fill display-4 text-primary"></i>
                  <h4 className="mt-3">Email</h4>
                  <div>support@hatespeechdetection.com</div>
                </a>
              </motion.div>
              <motion.div
                className="col-md-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="https://www.google.com/maps/search/?api=1&query=PMAS-Arid+Agriculture+University,+Rawalpindi,+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    background: 'rgba(40,40,50,0.08)',
                    borderRadius: '1rem',
                    padding: '2rem 1rem',
                    textAlign: 'center',
                    color: '#232a34',
                    textDecoration: 'none',
                    fontWeight: 500,
                    boxShadow: '0 2px 12px rgba(79,140,255,0.08)',
                    transition: 'background 0.2s, box-shadow 0.2s',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(79,140,255,0.10)'}
                  onMouseOut={e => e.currentTarget.style.background = 'rgba(40,40,50,0.08)'}
                >
                  <i className="bi bi-geo-alt-fill display-4 text-primary"></i>
                  <h4 className="mt-3">Visit Us</h4>
                  <div>PMAS-Arid Agriculture University, Rawalpindi, Pakistan</div>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          id="cta"
          className="py-5 bg-white text-dark text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="container">
            <h2 className="mb-4">Have More Questions?</h2>
            <p className="lead">Get in touch with us today for more details about Gen AI Plant Diseases Detection.</p>
          </div>
        </motion.section>

        <Footer />
      </motion.div>
    </>
  );
};

export default ContactUs;