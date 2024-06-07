import sys
import json
import newspaper

def get_top_articles(newspaper_url, num_articles=5):
    paper = newspaper.build(newspaper_url,number_threads=3)
    top_articles = []

    article_urls = [article.url for article in paper.articles[:num_articles]]

    for article in paper.articles[:num_articles]:
        article.download()
        article.parse()
        top_articles.append(article)
        article.url
    
    return zip(article_urls, top_articles)


if __name__ == "__main__":
    news_url = sys.argv[1]

    # Example usage with one of the popular news sites
    top_articles = get_top_articles(news_url, num_articles=5)

    articles_info = []
    # Display article titles
    for url, article in top_articles:
        single_info = {
            "newspaper": news_url,
            "title": article.title,
            "date": article.publish_date.strftime('%Y-%m-%d') if article.publish_date else None,
            "url": url
        }
        articles_info.append(single_info)

    # Convert the list to a JSON object
    articles_json = json.dumps(articles_info, indent=4)

    # Print the JSON object
    print(articles_json)
