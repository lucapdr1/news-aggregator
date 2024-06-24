import unittest
from ml.sentiment import detect_sentiment

class TestDetectSentiment(unittest.TestCase):

    def test_detect_sentiment_positive(self):
        text = "I love this product!"
        result= detect_sentiment(text)
        self.assertEqual(result,'positive')

    def test_detect_sentiment_negative(self):
        text = "I hate this product!"
        result= detect_sentiment(text)
        self.assertEqual(result,'negative')

    def test_detect_sentiment_neutral(self):
        text = "This product is okay."
        sentiment = detect_sentiment(text)
        self.assertEqual(sentiment, 'neutral')

if __name__ == '__main__':
    unittest.main()
