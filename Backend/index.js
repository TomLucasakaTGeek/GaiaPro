const express = require('express');
const axios = require('axios');

const app = express();
const port = 8003; // Updated port value

app.use(express.json());

// GET route to handle the request from the React component
app.get('/query', async (req, res) => {
  try {
    // Extract the message from the query parameters
    const userMessage = req.query.message;

    // Send the message to the API
    const response = await axios.post('https://llama3.us.gaianet.network/v1/chat/completions', {
      messages: [
        { role: 'user', content: userMessage }
      ]
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    // Send the API response back to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
