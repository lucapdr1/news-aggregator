import json
import newspaper

def get_popular_news_sites():
    popular_sites = newspaper.popular_urls()[:10]
    return popular_sites


if __name__ == "__main__":
    newspapers = get_popular_news_sites()
    print(json.dumps(newspapers))