from transformers import XLNetTokenizer
import torch

# Initialize XLNet tokenizer
tokenizer = XLNetTokenizer.from_pretrained('xlnet-base-cased')

# Tokenization function for a list of texts (used in training)
def tokenize_texts(texts, max_length=128):
    # Tokenize texts with padding and truncation
    encodings = tokenizer(
        texts,
        add_special_tokens=True,  # Add [CLS] and [SEP]
        max_length=max_length,
        padding='max_length',
        truncation=True,
        return_tensors='pt'  # Return PyTorch tensors
    )
    
    return encodings

# Tokenization function for a single text (used in web inference)
def tokenize_text(text, max_length=128):
    # Tokenize text with padding and truncation
    encodings = tokenizer(
        [text],  # Wrap text in a list for batch processing
        add_special_tokens=True,  # Add [CLS] and [SEP]
        max_length=max_length,
        padding='max_length',
        truncation=True,
        return_tensors='pt'  # Return PyTorch tensors
    )
    
    # Decode tokens for display
    token_ids = encodings['input_ids'][0].tolist()
    tokens = [tokenizer.decode([tid]) for tid in token_ids if tid != tokenizer.pad_token_id]
    
    return {
        'input_ids': encodings['input_ids'],
        'attention_mask': encodings['attention_mask'],
        'tokens': tokens
    }