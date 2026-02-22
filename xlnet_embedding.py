from transformers import XLNetModel
import torch

# Initialize XLNet model
xlnet_model = XLNetModel.from_pretrained('xlnet-base-cased')

# Function to get XLNet embeddings for a single text
def get_xlnet_embeddings(encodings):
    # Move encodings to GPU if available
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    xlnet_model.to(device)
    
    input_ids = encodings['input_ids'].to(device)
    attention_mask = encodings['attention_mask'].to(device)
    
    # Get embeddings
    with torch.no_grad():  # Disable gradient computation
        outputs = xlnet_model(input_ids=input_ids, attention_mask=attention_mask)
    
    # Return embeddings for the first token (e.g., [CLS]) for display
    embeddings = outputs.last_hidden_state[0, 0, :].cpu().numpy().tolist()  # Sample embedding
    return embeddings