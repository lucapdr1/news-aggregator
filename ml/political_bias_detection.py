import sys
import json
from transformers import pipeline

def detect_political_bias(text):
    # Load sentiment analysis model with explicit model and revision
    sentiment_model = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english", revision="af0f99b")

    # Perform sentiment analysis on the text
    sentiment = sentiment_model(text)

    # Based on sentiment score, determine political bias
    sentiment_score = sentiment[0]['score']
    if sentiment_score >= 0.6:
        return 'left-leaning'
    elif sentiment_score <= 0.4:
        return 'right-leaning'
    else:
        return 'neutral'

if __name__ == "__main__":
    text = sys.argv[1]
    political_bias = detect_political_bias(text)
    print(json.dumps(political_bias))
