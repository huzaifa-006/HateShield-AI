import torch

import torch.nn as nn
from transformers import XLNetTokenizer, XLNetModel
from safetensors.torch import load_file as safe_load
import os
import warnings
from django.conf import 
###
from ml_service.models.xlnet_classifier import XLNetClassifier
###

class XLNetClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        # Load XLNet model from pre-trained weights
        self.xlnet = XLNetModel.from_pretrained('xlnet-base-cased', trust_remote_code=True, use_safetensors=True)
        # Define attention layer
        self.attn = nn.Sequential(
            nn.Linear(self.xlnet.config.hidden_size, 512),
            nn.Tanh(),
            nn.Linear(512, 1)
        )
        # Define the final classifier layer
        self.classifier = nn.Linear(self.xlnet.config.hidden_size, 1)

    def forward(self, input_ids, attention_mask):
        # Get outputs from XLNet
        output = self.xlnet(input_ids=input_ids, attention_mask=attention_mask)
        # Get the last hidden state
        last_hidden_state = output.last_hidden_state
        # Calculate attention weights
        attn_weights = torch.softmax(self.attn(last_hidden_state).squeeze(-1), dim=1)
        # Apply attention to the last hidden state
        context = torch.sum(attn_weights.unsqueeze(-1) * last_hidden_state, dim=1)
        # Get logits from the classifier
        logits = self.classifier(context)
        return logits, attn_weights

class HateSpeechDetector:
    def __init__(self):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.max_len = 128
        
        
        tokenizer_path = os.path.join(settings.BASE_DIR, 'static', 'models')

        try:
            # self.tokenizer = XLNetTokenizer.from_pretrained(tokenizer_path)
            self.tokenizer = XLNetTokenizer.from_pretrained('xlnet-base-cased')

        except OSError:
            print(f"Could not load tokenizer from {tokenizer_path}. Downloading from huggingface.")
            self.tokenizer = XLNetTokenizer.from_pretrained('xlnet-base-cased')


        # Load model
        self.model = XLNetClassifier().to(self.device)
        model_path = os.path.join(tokenizer_path, 'xlnet_hate_speech_model.safetensors')
        
        try:
            with warnings.catch_warnings():
                warnings.simplefilter("ignore")
            # self.model.load_state_dict(torch.load(model_path, map_location=self.device))
            state_dict = safe_load(model_path)
            self.model.load_state_dict(state_dict)

            print(f"Model loaded successfully from {model_path}")
        except FileNotFoundError:
            print(f"Model file not found at {model_path}. Please ensure the model file exists.")
            raise
        
    
    def preprocess(self, text):
        """Preprocess the input text"""
        import re
        text = text.lower()
        text = re.sub(r"http\S+|www\S+|@\w+|[^a-zA-Z\s]", "", text)
        return re.sub(r"\s+", " ", text).strip()
    
    def predict(self, user_input):
        """Predict hate speech for given input"""
        # Step 1: Preprocessing
        preprocessed_input = self.preprocess(user_input)
        
        # Step 2: Tokenization
        tokens = self.tokenizer(
            preprocessed_input, 
            return_tensors='pt', 
            truncation=True, 
            padding='max_length', 
            max_length=self.max_len
        )
        input_ids = tokens['input_ids'].to(self.device)
        attention_mask = tokens['attention_mask'].to(self.device)
        tokens_list = self.tokenizer.convert_ids_to_tokens(input_ids[0])
        
        # Step 3: Prediction
        with torch.no_grad():
            logits, attn_weights = self.model(input_ids, attention_mask)
            prob = torch.sigmoid(logits).item()
            label = "HATE" if prob > 0.5 else "NOT HATE"
            conf = prob if label == "HATE" else 1 - prob
        
        
        attn_weights = attn_weights[0].cpu().numpy()
        
        
        meaningful_tokens = []
        meaningful_indices = []
        meaningful_attn_weights = []
        
        for i, token in enumerate(tokens_list):
            
            if (token not in self.tokenizer.all_special_tokens and 
                token != '<pad>' and 
                token != '<unk>' and
                token.strip() != '' and
                not token.startswith('<') and
                not token.endswith('>')):
                
               
                clean_token = token
                if clean_token.startswith('▁'):
                    clean_token = clean_token[1:]  
                
                
                if clean_token.strip() and len(clean_token.strip()) > 0:
                    meaningful_tokens.append(clean_token)
                    meaningful_indices.append(i)
                    meaningful_attn_weights.append(attn_weights[i])
        top_tokens = []
        top_weights = []
        if meaningful_tokens:
            import numpy as np
            top_k = min(10, len(meaningful_tokens))
            top_indices_real = np.argsort(meaningful_attn_weights)[::-1][:top_k]
            top_tokens = [meaningful_tokens[i] for i in top_indices_real]
            top_weights = [float(meaningful_attn_weights[i]) for i in top_indices_real]
        
        return {
            'original_text': user_input,
            'preprocessed_text': preprocessed_input,
            'tokens': meaningful_tokens,  
            'prediction': label,
            'confidence': conf,
            'probability': prob,
            'top_influential_tokens': list(zip(top_tokens, top_weights))
        } 
