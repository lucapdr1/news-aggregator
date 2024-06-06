// PoliticalBias.tsx
import React, { useState } from 'react';

interface ProcessDataProps {
  preprocessedData: any;
}

const PoliticalBias: React.FC<ProcessDataProps> = ({ preprocessedData }) => {
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false); // to track if processing is in progress

  const handleProcessData = async () => {
    setError(null);
    setProcessing(true); // indicate processing started

    try {
      const res = await fetch('api/political-bias', { // assuming endpoint is named political-sentiment-bias
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //TODO: better specify data to preprocess
        body: JSON.stringify({ text: preprocessedData }), // assuming data key is expected in the body
      });

      const resultData = await res.json();
      if (res.ok) {
        setResult(resultData);
      } else {
        setError(resultData.error);
      }
    } catch (err) {
      setError('An error occurred while processing the data.');
    } finally {
      setProcessing(false); // reset processing state
    }
  };

  return (
    <div>
      <h2 className="mt-4 font-bold">Analize Data</h2>
      <button onClick={handleProcessData} disabled={processing} className={`p-2 bg-green-500 text-white rounded ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {processing ? 'Processing...' : 'Process Data'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {result && (
        <div>
          <h2 className="mt-4 font-bold">Analysis Result</h2>
          <pre className="bg-gray-100 p-4 text-black rounded">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PoliticalBias;
