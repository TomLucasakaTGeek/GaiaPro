import React, { useState } from 'react';
import axios from 'axios';

const QueryComponent = () => {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleQuery = async () => {
    try {
      const res = await axios.post('http://localhost:3000/query');
      setResponse(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Something went wrong!');
      setResponse('');
    }
  };

  return (
    <div>
      <button onClick={handleQuery}>Send Query</button>
      {response && <div><strong>Response:</strong> {JSON.stringify(response)}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default QueryComponent;
