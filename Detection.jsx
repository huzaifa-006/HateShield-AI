import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StarRating from '../components/StarRating';
import { detectHateSpeech, submitFeedback } from '../services/detectionService';

const DetectionPage = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [detectionId, setDetectionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [testStatus, setTestStatus] = useState('');
  
  // Feedback states
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState('');

  const resetForm = () => {
    setText('');
    setFile(null);
    setResult(null);
    setDetectionId(null);
    setError('');
    setExtractedText('');
    setTestStatus('');
    setShowFeedback(false);
    setFeedbackRating(0);
    setFeedbackComment('');
    setFeedbackSubmitted(false);
    setFeedbackError('');
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setFile(null);
    setResult(null);
    setDetectionId(null);
    setError('');
    setExtractedText('');
    setTestStatus('');
    setShowFeedback(false);
    setFeedbackRating(0);
    setFeedbackComment('');
    setFeedbackSubmitted(false);
    setFeedbackError('');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setText('');
      setResult(null);
      setDetectionId(null);
      setError('');
      setExtractedText('');
      setTestStatus('');
      setShowFeedback(false);
      setFeedbackRating(0);
      setFeedbackComment('');
      setFeedbackSubmitted(false);
      setFeedbackError('');
    }
  };

  const testBackendConnection = async () => {
    try {
      setTestStatus('Testing connection...');
      const testText = "This is a test message for hate speech detection.";
      const results = await detectHateSpeech(testText);
      setTestStatus('Backend connection successful! Model is working.');
      setResult(results);
    } catch (err) {
      setTestStatus(`Backend connection failed: ${err.message}`);
      console.error('Backend test error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim() && !file) {
      setError('Please enter text or upload a file');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setTestStatus('');
      setShowFeedback(false);
      setFeedbackRating(0);
      setFeedbackComment('');
      setFeedbackSubmitted(false);
      setFeedbackError('');
      
      const response = await detectHateSpeech(text, file);
      
      // Extract detection ID from the response
      if (response.detection_id) {
        setDetectionId(response.detection_id);
      }
      
      // Set the results from the nested structure
      if (response.results) {
        setResult(response.results);
      } else {
        setResult(response);
      }
      
      // Check for extracted text
      if (response.results && response.results.extracted_text) {
        setExtractedText(response.results.extracted_text);
      } else if (response.extracted_text) {
        setExtractedText(response.extracted_text);
      }
      
      // Show feedback section after successful detection
      setShowFeedback(true);
    } catch (err) {
      console.error('Error in handleSubmit:', err); 
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!detectionId || !feedbackRating) {
      setFeedbackError('Please select a rating before submitting feedback.');
      return;
    }

    try {
      setFeedbackLoading(true);
      setFeedbackError('');
      
      await submitFeedback(detectionId, feedbackRating, feedbackComment);
      setFeedbackSubmitted(true);
      
      // Hide feedback section after successful submission
      setTimeout(() => {
        setShowFeedback(false);
        setFeedbackRating(0);
        setFeedbackComment('');
        setFeedbackSubmitted(false);
      }, 3000);
      
    } catch (err) {
      console.error('Feedback submission error:', err);
      setFeedbackError(err.message);
    } finally {
      setFeedbackLoading(false);
    }
  };

  const getPredictionColor = (prediction) => {
    return prediction === 'HATE' ? 'danger' : 'success';
  };

  const getPredictionLabel = (prediction) => {
    return prediction === 'HATE' ? 'Hate Speech Detected' : 'No Hate Speech Detected';
  };

  return (
    <>
      <Navbar />

      <motion.section
        className="py-5 bg-dark text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <h1 className="display-5">Hate Speech Detection</h1>
          <p className="lead">Enter text or upload a file to detect hate speech using our AI model.</p>
          
          {/* Backend Test Button */}
          <div className="mt-3">
            <button 
              onClick={testBackendConnection}
              className="btn btn-outline-light btn-sm"
              disabled={loading}
            >
              <i className="bi bi-wifi me-2"></i>
              Test Backend Connection
            </button>
            {testStatus && (
              <div className={`alert alert-${testStatus.includes('successful') ? 'success' : 'warning'} mt-2`}>
                {testStatus}
              </div>
            )}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Option 1: Enter Text</h5>
                <button 
                  type="button" 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => {
                    setText('');
                    setFile(null);
                  }}
                >
                  Clear
                </button>
              </div>
              <div className="mb-3">
                <label htmlFor="textInput" className="form-label">Enter Text</label>
                <textarea
                  className="form-control"
                  id="textInput"
                  rows="4"
                  placeholder="Type here..."
                  value={text}
                  onChange={handleTextChange}
                  disabled={!!file}
                />
              </div>
            </div>

            <div className="text-center mb-4">
              <span className="text-muted">OR</span>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Option 2: Upload File</h5>
                <button 
                  type="button" 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => {
                    setFile(null);
                    setText('');
                  }}
                >
                  Clear
                </button>
              </div>
              <div className="border rounded p-4 text-center bg-light">
                <div className="mb-3">
                  <label htmlFor="fileInput" className="form-label">
                    <i className="bi bi-cloud-upload fs-1"></i>
                    <div>Choose a file to upload</div>
                    <small className="text-muted">Supported formats: .txt, .pdf, .docx</small>
                  </label>
                  <input
                    type="file"
                    className="form-control d-none"
                    id="fileInput"
                    accept=".txt,.pdf,.docx"
                    onChange={handleFileChange}
                    disabled={!!text}
                  />
                </div>
                {file && (
                  <div className="alert alert-info">
                    Selected file: {file.name}
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex gap-2">
              <button 
                type="submit" 
                className="btn btn-primary flex-grow-1" 
                disabled={loading || (!text.trim() && !file)}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Analyzing...
                  </>
                ) : (
                  'Analyze'
                )}
              </button>
              <button 
                type="button" 
                className="btn btn-outline-danger"
                onClick={resetForm}
                disabled={loading}
              >
                Reset All
              </button>
            </div>
          </form>

          {/* Loading Spinner */}
          {loading && (
            <div className="text-center mt-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Analyzing...</span>
              </div>
              <p className="mt-2">Analyzing content with AI model...</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger mt-4" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}

          {/* Extracted Text */}
          {extractedText && (
            <div className="mt-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Extracted Text</h5>
                </div>
                <div className="card-body">
                  <p className="text-muted">{extractedText}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="card border-0 shadow">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-graph-up me-2"></i>
                    Analysis Results
                  </h5>
                </div>
                <div className="card-body">
                  {/* Main Prediction */}
                  <div className="mb-4">
                    <div className={`alert alert-${getPredictionColor(result.prediction)} border-0`}>
                      <div className="d-flex align-items-center">
                        <i className={`bi bi-${result.prediction === 'HATE' ? 'exclamation-triangle' : 'check-circle'} fs-4 me-3`}></i>
                        <div>
                          <h6 className="mb-1">{getPredictionLabel(result.prediction)}</h6>
                          <p className="mb-0">
                            Confidence: <strong>{(result.confidence * 100).toFixed(2)}%</strong> | 
                            Probability: <strong>{(result.probability * 100).toFixed(2)}%</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Original Text */}
                  <div className="mb-4">
                    <h6 className="text-primary">
                      <i className="bi bi-file-text me-2"></i>
                      Original Text
                    </h6>
                    <div className="bg-light p-3 rounded">
                      <p className="mb-0">{result.original_text}</p>
                    </div>
                  </div>

                  {/* Preprocessed Text */}
                  <div className="mb-4">
                    <h6 className="text-primary">
                      <i className="bi bi-gear me-2"></i>
                      Preprocessed Text
                    </h6>
                    <div className="bg-light p-3 rounded">
                      <p className="mb-0 text-muted">{result.preprocessed_text}</p>
                    </div>
                  </div>

                  {/* Tokens */}
                  <div className="mb-4">
                    <h6 className="text-primary">
                      <i className="bi bi-tags me-2"></i>
                      Meaningful Tokens ({result.tokens ? result.tokens.length : 0} tokens)
                    </h6>
                    {result.tokens && result.tokens.length > 0 ? (
                      <div>
                        <div className="d-flex flex-wrap gap-1 mb-2">
                          {result.tokens.map((token, index) => (
                            <span key={index} className="badge bg-secondary">{token}</span>
                          ))}
                        </div>
                        <small className="text-muted">
                          <i className="bi bi-info-circle me-1"></i>
                          Showing only meaningful user input tokens (filtered out special tokens and padding)
                        </small>
                      </div>
                    ) : (
                      <div className="alert alert-info">
                        <i className="bi bi-info-circle me-2"></i>
                        No meaningful tokens found in the input text. This may happen with very short inputs or special characters.
                      </div>
                    )}
                  </div>

                  {/* Top Influential Tokens */}
                  {result.top_influential_tokens && result.top_influential_tokens.length > 0 && (
                    <div className="mb-4">
                      <h6 className="text-primary">
                        <i className="bi bi-star me-2"></i>
                        Top Influential Tokens
                      </h6>
                      <div className="row">
                        {result.top_influential_tokens.map(([token, weight], index) => (
                          <div key={index} className="col-md-6 col-lg-4 mb-2">
                            <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded">
                              <span className="fw-bold">{token}</span>
                              <span className="badge bg-warning text-dark">
                                {(weight * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Confidence Bar */}
                  <div className="mb-3">
                    <h6 className="text-primary">
                      <i className="bi bi-bar-chart me-2"></i>
                      Confidence Level
                    </h6>
                    <div className="progress" style={{ height: '25px' }}>
                      <div 
                        className={`progress-bar bg-${getPredictionColor(result.prediction)}`}
                        style={{ width: `${(result.confidence * 100)}%` }}
                        role="progressbar"
                        aria-valuenow={result.confidence * 100}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {(result.confidence * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Feedback Section */}
          {showFeedback && (
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="card border-0 shadow">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-star me-2"></i>
                    Rate This Analysis
                  </h5>
                </div>
                <div className="card-body">
                  {!feedbackSubmitted ? (
                    <>
                      <p className="text-muted mb-3">
                        How accurate was this hate speech detection? Your feedback helps us improve our model.
                      </p>
                      
                      <div className="mb-3">
                        <label className="form-label">Rating:</label>
                        <div className="d-flex align-items-center gap-3">
                          <StarRating 
                            rating={feedbackRating} 
                            onRatingChange={setFeedbackRating}
                            size="xl"
                          />
                          <span className="text-muted">
                            {feedbackRating > 0 && (
                              <span className="badge bg-warning text-dark">
                                {feedbackRating} {feedbackRating === 1 ? 'Star' : 'Stars'}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="feedbackComment" className="form-label">Comment (Optional):</label>
                        <textarea
                          className="form-control"
                          id="feedbackComment"
                          rows="3"
                          placeholder="Share your thoughts about this detection..."
                          value={feedbackComment}
                          onChange={(e) => setFeedbackComment(e.target.value)}
                        />
                      </div>

                      {feedbackError && (
                        <div className="alert alert-danger mb-3">
                          <i className="bi bi-exclamation-triangle me-2"></i>
                          {feedbackError}
                        </div>
                      )}

                      <div className="d-flex gap-2">
                        <button 
                          type="button" 
                          className="btn btn-success"
                          onClick={handleFeedbackSubmit}
                          disabled={feedbackLoading || !feedbackRating}
                        >
                          {feedbackLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-check-circle me-2"></i>
                              Submit Feedback
                            </>
                          )}
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-outline-secondary"
                          onClick={() => setShowFeedback(false)}
                          disabled={feedbackLoading}
                        >
                          Skip
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <i className="bi bi-check-circle text-success fs-1 mb-3"></i>
                      <h5 className="text-success">Thank You!</h5>
                      <p className="text-muted">Your feedback has been submitted successfully.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.section>

      <Footer />
    </>
  );
};

export default DetectionPage;
