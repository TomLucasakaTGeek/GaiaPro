const express = require('express');
const axios = require('axios');

const app = express();
const port = 8003;

app.use(express.json());

app.post('/query', async (req, res) => {
  try {
    const response = await axios.post('https://codestral.us.gaianet.network/v1/chat/completions', {
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Where is Paris?' }
      ]
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
