import React, { useState } from 'react';

interface Article {
    newspaper : string
    title: string;
    date : string;
    url: string;
    text: string;
}

interface Props {
    article: Article;
}

const ArticleItem: React.FC<Props> = ({ article }) => {
    const [summary, setSummary] = useState<string | null>(null);
    const [sentiment, setSentiment] = useState<string | null>(null);
    const [topic, setTopic] = useState<string | null>(null);

    const [loadingSummary, setLoadingSummary] = useState<boolean>(false);
    const [loadingSentiment, setLoadingSentiment] = useState<boolean>(false);
    const [loadingTopic, setLoadingTopic] = useState<boolean>(false);

    const summarizeArticle = async () => {
        setLoadingSummary(true)
        try {
            const res = await fetch('/api/summary', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url : article.url }),
              });

            const data = await res.json();
            setSummary(data);
        } catch (error) {
            console.error('Error summarizing article:', error);
        }finally {
            setLoadingSummary(false);
        }
    };

    const getSentiment = async () => {
        setLoadingSentiment(true);
        try {
            const res = await fetch('api/sentiment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text : article.text }),
              });
            const data = await res.json();
            setSentiment(data);
        } catch (error) {
            console.error('Error getting sentiment:', error);
        }finally{
            setLoadingSentiment(false)
        }
    };

    const getTopic = async () => {
        setLoadingTopic(true)
        try {
            const res = await fetch('api/topic', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text : article.text }),
              });
            const data = await res.json();
            setTopic(data);
        } catch (error) {
            console.error('Error getting topic:', error);
        }finally{
            setLoadingTopic(false)
        }
    };

    return (
        <div className="border p-4 mb-4">
            <h3 className="text-lg font-bold">{article.title}</h3>
            <a className="block mb-2 text-blue-500" href={article.url} target="_blank" rel="noopener noreferrer">Read full article</a>
            <div className="flex mb-2">
                <button
                    className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={summarizeArticle}
                    disabled={loadingSummary}
                >
                    {loadingSummary ? 'Summarizing...' : 'Summarize'}
                </button>
                <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={getSentiment}
                    disabled={loadingSentiment}
                >
                    {loadingSentiment ? 'Loading Sentiment...' : 'Get sentiment'}
                </button>
                <button
                    className="mx-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={getTopic}
                    disabled={loadingTopic}
                >
                    {loadingTopic ? 'Loading Topic...' : 'Get Topic'}
                </button>
            </div>
            {topic && <p><strong>topic:</strong> {topic}</p>}
            {summary && <p className="mb-2"><strong>Summary:</strong> {summary}</p>}
            {sentiment && <p><strong>sentiment:</strong> {sentiment}</p>}
        </div>
    );
};

export default ArticleItem;
