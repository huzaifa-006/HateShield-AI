#!/usr/bin/env python3
"""
Test script to verify token filtering in the hate speech detection model.
This script tests the token filtering functionality to ensure only meaningful tokens are returned.
"""

import sys
import os

# Add the project root to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hateSpeech.settings')

import django
django.setup()

from backend.detection.xlnet_classifier import HateSpeechDetector

def test_token_filtering():
    """Test the token filtering functionality"""
    
    print("Testing Token Filtering in Hate Speech Detection Model")
    print("=" * 60)
    
    # Initialize the detector
    try:
        detector = HateSpeechDetector()
        print("✅ Model loaded successfully")
    except Exception as e:
        print(f"❌ Failed to load model: {e}")
        return
    
    # Test cases
    test_cases = [
        "This is a test message",
        "I hate you",
        "Hello world",
        "Fuck you",
        "This is me fuck",
        "A",  # Very short input
        "   ",  # Empty/whitespace input
        "Hello! How are you? @user #hashtag",  # With special characters
    ]
    
    for i, test_text in enumerate(test_cases, 1):
        print(f"\n--- Test Case {i}: '{test_text}' ---")
        
        try:
            # Get prediction
            results = detector.predict(test_text)
            
            print(f"Original text: '{results['original_text']}'")
            print(f"Preprocessed text: '{results['preprocessed_text']}'")
            print(f"Prediction: {results['prediction']}")
            print(f"Confidence: {results['confidence']:.3f}")
            print(f"Meaningful tokens ({len(results['tokens'])}): {results['tokens']}")
            
            if results['top_influential_tokens']:
                print("Top influential tokens:")
                for token, weight in results['top_influential_tokens'][:3]:  # Show top 3
                    print(f"  - '{token}': {weight:.3f}")
            
            # Check if filtering worked
            has_special_tokens = any(token.startswith('<') or token.endswith('>') for token in results['tokens'])
            has_padding = any(token == '<pad>' for token in results['tokens'])
            
            if has_special_tokens or has_padding:
                print("❌ Token filtering failed - special tokens or padding found")
            else:
                print("✅ Token filtering working correctly")
                
        except Exception as e:
            print(f"❌ Error processing test case: {e}")
    
    print("\n" + "=" * 60)
    print("Token filtering test completed!")

if __name__ == "__main__":
    test_token_filtering() 