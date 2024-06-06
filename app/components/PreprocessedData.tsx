// PreprocessedData.tsx
import React, { useState } from 'react';

interface ResultProps {
  resultData: any;
}

const PreprocessedData: React.FC<ResultProps> = ({ resultData }) => {
  return (
    <div>
      <h2 className="mt-4 font-bold">Processed Data</h2>
      <pre className="bg-gray-100 p-4 text-black rounded">{JSON.stringify(resultData, null, 2)}</pre>
    </div>
  );
};

export default PreprocessedData;
