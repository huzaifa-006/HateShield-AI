from .xlnet_classifier import HateSpeechDetector
import os
from django.conf import settings

# Initialize the detector as a global variable to avoid reloading the model
_detector = None

def get_detector():
    """Get or create the hate speech detector instance"""
    global _detector
    if _detector is None:
        _detector = HateSpeechDetector()
    return _detector

# Pipeline function to process a single text
def run_pipeline(text):
    """
    Process text through the hate speech detection pipeline
    
    Args:
        text (str): Input text to analyze
        
    Returns:
        dict: Results containing original text, preprocessing, tokens, and prediction
    """
    try:
        detector = get_detector()
        results = detector.predict(text)
        
        return {
            'original_text': results['original_text'],
            'preprocessed_text': results['preprocessed_text'],
            'tokens': results['tokens'],
            'prediction': results['prediction'],
            'confidence': results['confidence'],
            'probability': results['probability'],
            'top_influential_tokens': results['top_influential_tokens']
        }
    except Exception as e:
        raise Exception(f"Error in hate speech detection pipeline: {str(e)}")