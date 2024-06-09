"use client"; 
import React, { useState, useEffect } from 'react';
import ArticleList from './ArticleList'

const Feed: React.FC = () => {
    const [urls, setUrls] = useState<string[]>([
        'https://time.com/',
        'https://www.theguardian.com/europe',
        'https://edition.cnn.com/'
    ]);

    return (
        <div className="feed">
            {urls.map((url, index) => (
                <ArticleList key={index} url={url} />
            ))}
        </div>
    );
};

export default Feed;
