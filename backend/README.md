# Hate Speech Detection System

This Django project implements a hate speech detection system using XLNet with attention mechanism.

## Features

- **Text Preprocessing**: Removes URLs, mentions, and special characters
- **Tokenization**: Uses XLNet tokenizer for text tokenization
- **Hate Speech Detection**: Classifies text as "HATE" or "NOT HATE"
- **Confidence Scoring**: Provides confidence scores for predictions
- **Attention Visualization**: Shows top influential tokens
- **File Upload Support**: Supports .txt, .pdf, and .docx files
- **API Endpoints**: RESTful API for integration

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Database Setup

```bash
python manage.py makemigrations
python manage.py migrate
```

### 3. Static Files

Ensure your model files are in the correct location:
```
static/
└── models/
    ├── xlnet_hate_speech_model.pth
    ├── spiece.model
    ├── special_tokens_map.json
    └── tokenizer_config.json
```

### 4. Run the Server

```bash
python manage.py runserver
```

## API Usage

### Test Model Endpoint

Test if the model is working correctly:
```bash
GET /detection/test/
```

### Hate Speech Detection Endpoint

Analyze text for hate speech:
```bash
POST /detection/
```

**Request Body (JSON):**
```json
{
    "text": "your text here"
}
```

**Response:**
```json
{
    "message": "Text processed successfully",
    "results": {
        "original_text": "your text here",
        "preprocessed_text": "your text here",
        "tokens": ["[CLS]", "your", "text", "here", "[SEP]", ...],
        "prediction": "HATE",
        "confidence": 0.8542,
        "probability": 0.8542,
        "top_influential_tokens": [
            ["hate", 0.1234],
            ["you", 0.0987],
            ...
        ]
    }
}
```

### File Upload

You can also upload files (.txt, .pdf, .docx) using form data:
```bash
POST /detection/
Content-Type: multipart/form-data

file: [your_file]
```

## Testing

Run the test script to verify the model:
```bash
python test_model.py
```

## Project Structure

```
hateSpeech/
├── detection/
│   ├── xlnet_classifier.py    # Main model implementation
│   ├── utils.py              # Pipeline utilities
│   ├── views.py              # API endpoints
│   └── urls.py               # URL routing
├── static/
│   └── models/               # Model and tokenizer files
├── templates/                # HTML templates
└── manage.py                 # Django management
```

## Model Details

The system uses:
- **XLNet Base Cased**: Pre-trained transformer model
- **Attention Mechanism**: Custom attention layer for better interpretability
- **Binary Classification**: HATE vs NOT HATE
- **Threshold**: 0.5 probability threshold

## Error Handling

The system includes comprehensive error handling for:
- Missing model files
- Invalid file formats
- Tokenizer loading issues
- Model prediction errors

## Performance

- **Model Loading**: Lazy loading (loaded once per server instance)
- **Prediction Speed**: Optimized for real-time inference
- **Memory Usage**: Efficient tensor operations 