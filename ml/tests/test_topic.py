import unittest
from ml.topic import get_topic

class TestTopicModeling(unittest.TestCase):

    def test_topic_modeling(self):
        text = "Tax cuts and policy are key. Tax cuts are significant. Policy reforms and tax cuts."
        topics = get_topic(text) 
        expected_main_words = ['tax', 'cuts', 'policy']
        topic_words = topics.split()
        for word in expected_main_words:
            self.assertIn(word, topic_words)

if __name__ == '__main__':
    unittest.main()