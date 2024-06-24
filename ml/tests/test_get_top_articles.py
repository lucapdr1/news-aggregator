import unittest

from ml.top_articles import get_top_articles

class TestGetTopArticles(unittest.TestCase):
    def test_get_top_articles(self):
        # Define test data (e.g., a known news site URL)
        news_url = 'https://time.com/'
        num_articles = 5

        # Call the function to get top articles
        top_articles = get_top_articles(news_url, num_articles)

        # Assert that top_articles is not None and contains expected data
        self.assertIsNotNone(top_articles)

        # Assert each article in top_articles contains valid data
        for url, article in top_articles:
            self.assertIsNotNone(article.title)
            self.assertIsNotNone(article.url)
            self.assertIsNotNone(article.text)
            self.assertIsInstance(article.title, str)
            self.assertIsInstance(article.url, str)
            self.assertIsInstance(article.text, str)

if __name__ == '__main__':
    unittest.main()