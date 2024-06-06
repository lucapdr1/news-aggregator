"use client"; 
import React, { useState } from 'react';
import PreprocessedData from './PreprocessedData';
import PoliticalBias from './PoliticalBias';

const NewsForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFetching(true)

    try {
      const res = await fetch('/api/process-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const result = await res.json();
      if (res.ok) {
        setData(result);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred while processing the URL.');
    }finally {
      setFetching(false); // reset processing state
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter news URL"
          className="p-2 border border-gray-300 text-black rounded"
        />
        <button type="submit" disabled={fetching} className={`p-2 bg-blue-500 text-white rounded ${fetching ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {fetching ? 'Loading...' : 'Submit'}
      </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {data && <>
      <PreprocessedData resultData={data} />
      <PoliticalBias preprocessedData={data}/>
      </>
      }
    </div>
  );
};

export default NewsForm;
