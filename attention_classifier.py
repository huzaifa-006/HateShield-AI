import torch
import torch.nn as nn
from transformers import XLNetModel

# Define attention layer
class AttentionLayer(nn.Module):
    def __init__(self, hidden_size):
        super(AttentionLayer, self).__init__()
        self.attention = nn.Linear(hidden_size, 1)
        self.softmax = nn.Softmax(dim=1)
        
    def forward(self, hidden_states):
        # Compute attention scores
        attention_scores = self.attention(hidden_states)  # [batch_size, seq_length, 1]
        attention_weights = self.softmax(attention_scores)  # [batch_size, seq_length, 1]
        
        # Weighted sum of hidden states
        context_vector = torch.sum(attention_weights * hidden_states, dim=1)  # [batch_size, hidden_size]
        return context_vector

# Define classifier with attention
class XLNetAttentionClassifier(nn.Module):
    def __init__(self, num_labels=1, dropout=0.1):  # num_labels=1 for binary classification
        super(XLNetAttentionClassifier, self).__init__()
        self.xlnet = XLNetModel.from_pretrained('xlnet-base-cased')
        self.attention = AttentionLayer(self.xlnet.config.hidden_size)
        self.dropout = nn.Dropout(dropout)
        self.classifier = nn.Linear(self.xlnet.config.hidden_size, num_labels)
        self.sigmoid = nn.Sigmoid()
        
    def forward(self, input_ids, attention_mask):
        # Get XLNet outputs
        outputs = self.xlnet(input_ids=input_ids, attention_mask=attention_mask)
        hidden_states = outputs.last_hidden_state  # [batch_size, seq_length, hidden_size]
        
        # Apply attention
        context_vector = self.attention(hidden_states)  # [batch_size, hidden_size]
        context_vector = self.dropout(context_vector)
        
        # Classify
        logits = self.classifier(context_vector)
        probs = self.sigmoid(logits)
        return probs