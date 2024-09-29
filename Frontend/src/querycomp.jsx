import React, { useState } from 'react';
import axios from 'axios';

const QueryComponent = () => {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleQuery = async () => {
    try {
      const res = await axios.get('http://localhost:8003/query', {
        params: { message }
      });
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
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={handleQuery}>Send Query</button>
      {response && <div><strong>Response:</strong> {JSON.stringify(response)}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default QueryComponent;
