import sys
import json
from transformers import pipeline

def detect_sentiment(text):
    # Load sentiment analysis model with explicit model and revision
    sentiment_model = pipeline(model="nlptown/bert-base-multilingual-uncased-sentiment")

    # Perform sentiment analysis on the text
    sentiment = sentiment_model(text)

    # Based on sentiment score, determine sentiment
    sentiment_label = sentiment[0]['label']
    sentiment_score = float(sentiment_label.split()[0])

    if sentiment_score > 3:
        return 'positive'
    elif sentiment_score < 3:
        return 'negative'
    else:
        return 'neutral'

if __name__ == "__main__":
    text = sys.argv[1]
    sentiment = detect_sentiment(text)
    print(json.dumps(sentiment))
