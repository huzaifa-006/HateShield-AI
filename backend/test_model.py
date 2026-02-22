#!/usr/bin/env python
"""
Test script for the hate speech detection model
This script can be run independently to test the model functionality
"""

import os
import sys
import django

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hateSpeech.settings')
django.setup()

from backend.detection.xlnet_classifier import HateSpeechDetector

def test_model():
    """Test the hate speech detection model with sample inputs"""
    
    print("Initializing Hate Speech Detector...")
    try:
        detector = HateSpeechDetector()
        print("✓ Model loaded successfully!")
    except Exception as e:
        print(f"✗ Error loading model: {e}")
        return
    
    # Test cases
    test_cases = [
        "this is a disgusting person i hate you",
        "i love this weather today",
        "you are an amazing person",
        "i hate everyone in this world",
        "have a great day!",
        "you are worthless and should die"
    ]
    
    print("\n" + "="*60)
    print("TESTING HATE SPEECH DETECTION")
    print("="*60)
    
    for i, test_text in enumerate(test_cases, 1):
        print(f"\n--- Test Case {i} ---")
        print(f"Input: '{test_text}'")
        
        try:
            results = detector.predict(test_text)
            
            print(f"Preprocessed: '{results['preprocessed_text']}'")
            print(f"Prediction: {results['prediction']}")
            print(f"Confidence: {results['confidence']:.4f}")
            print(f"Probability: {results['probability']:.4f}")
            
            if results['top_influential_tokens']:
                print("Top influential tokens:")
                for token, weight in results['top_influential_tokens'][:5]:
                    print(f"  '{token}': {weight:.4f}")
            
        except Exception as e:
            print(f"✗ Error processing text: {e}")
        
        print("-" * 40)

if __name__ == "__main__":
    test_model() 