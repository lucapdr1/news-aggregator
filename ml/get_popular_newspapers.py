import json
import newspaper
from newspaper import Article, Config, news_pool

def get_popular_news_sites():
    popular_sites = newspaper.popular_urls()[:10]
    return popular_sites

def get_top_articles(newspapers, num_articles=5):
    papers = [newspaper.build(url) for url in newspapers]
    news_pool.set(papers, threads_per_source=2)
    news_pool.join()

    top_articles = {}
    for paper in papers:
        top_articles[paper.brand] = []
        for article in paper.articles[:num_articles]:
            article.download()
            article.parse()
            top_articles[paper.brand].append(article)
    
    return top_articles




if __name__ == "__main__":
    newspapers = get_popular_news_sites()
    processed_data = get_top_articles(newspapers=newspapers)
    print(json.dumps(processed_data))