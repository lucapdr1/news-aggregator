import React from 'react';
import NewsForm from './components/NewsForm';
import Feed from './components/Feed';

const HomePage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">News Aggregator</h1>
      <Feed />
    </div>
  );
};

export default HomePage;
