import sys
import json
from transformers import pipeline

def detect_sentiment(text):
    # Load sentiment analysis model with explicit model and revision
    sentiment_model = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english", revision="af0f99b")

    # Perform sentiment analysis on the text
    sentiment = sentiment_model(text)

    # Based on sentiment score, determine sentiment
    sentiment_score = sentiment[0]['score']
    if sentiment_score >= 0.6:
        return 'positive'
    elif sentiment_score <= 0.4:
        return 'negative'
    else:
        return 'neutral'

if __name__ == "__main__":
    text = sys.argv[1]
    sentiment = detect_sentiment(text)
    print(json.dumps(sentiment))
