from flask import Flask, request, jsonify

app = Flask(__name__)

# TEMP stub — replace with real model later
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text", "")

    # Dummy response to unblock pipeline
    return jsonify({
        "label": "non-hate",
        "confidence": 0.99,
        "text": text
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
