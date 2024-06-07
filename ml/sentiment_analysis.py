import nltk
#nltk.download('vader_lexicon')
from nltk.sentiment import SentimentIntensityAnalyzer



def analyze_sentiment(text):
    sid = SentimentIntensityAnalyzer()
    sentiment_scores = sid.polarity_scores(text)
    sentiment_label = 'positive' if sentiment_scores['compound'] > 0 else 'negative' if sentiment_scores['compound'] < 0 else 'neutral'
    return sentiment_label