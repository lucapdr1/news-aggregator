import sys
import json
import newspaper

import json

def summarize(article_url):
    article = newspaper.article(article_url)
    article.download()
    article.parse()
    article.nlp()
    return article.summary

if __name__ == "__main__":
    article_url = sys.argv[1]
    summary = summarize(article_url)
    print(json.dumps(summary))

