import React, { useState, useEffect } from 'react';
import ArticleItem from './ArticleItem'
interface Article {
    newspaper : string
    title: string;
    date : string;
    url: string;
    text: string;
}

interface Props {
    url: string;
}

const ArticleList: React.FC<Props> = ({ url }) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch('/api/top-articles', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ url }),
                });
          
                const result = await res.json();
                if (res.ok) {
                  setArticles(result);
                } else {
                    console.error('Error fetching articles:', result.error);
                }
              } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [url]);

    if (loading) {
        return <div>Loading articles from {url}</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Top Articles from {url}</h2>
            {articles.map((article, index) => (
                <ArticleItem key={index} article={article} />
            ))}
        </div>
    );
};

export default ArticleList;
