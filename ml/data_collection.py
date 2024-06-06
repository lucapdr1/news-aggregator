import sys
import json
from newspaper import Article

def process_url(url):
    article = Article(url)
    article.download()
    article.parse()
    
    result = {
        'url': url,
        'title': article.title,
        'text': article.text
    }
    return result

if __name__ == "__main__":
    url = sys.argv[1]
    processed_data = process_url(url)
    print(json.dumps(processed_data))
