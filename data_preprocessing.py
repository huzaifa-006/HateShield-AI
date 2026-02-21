import re
import pandas as pd
from sklearn.utils.class_weight import compute_class_weight
import numpy as np

# Preprocessing function for a single text
def preprocess_text(text):
    # Convert to string (handle non-string inputs)
    text = str(text)
    
    # Convert to lowercase
    text = text.lower()
    
    # Remove URLs
    text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
    
    # Remove mentions (@username)
    text = re.sub(r'@\w+', '', text)
    
    # Remove special characters and emojis, keep alphanumeric and spaces
    text = re.sub(r'[^a-z0-9\s]', '', text)
    
    # Remove extra whitespace
    text = ' '.join(text.split())
    
    return text

# Apply preprocessing to dataset
def preprocess_dataset(data):
    # Apply text cleaning to 'text' column
    data['text'] = data['text'].apply(preprocess_text)
    
    # Handle missing values (if any)
    data = data.dropna()
    
    return data

# Compute class weights for imbalanced dataset
def get_class_weights(labels):
    # Calculate class weights for binary classification
    classes = np.unique(labels)
    class_weights = compute_class_weight('balanced', classes=classes, y=labels)
    return dict(zip(classes, class_weights))