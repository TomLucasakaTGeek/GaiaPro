const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

require('dotenv').config()
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', async (message) => {
    try {
      const response = await axios.post(process.env.KEY
        , {
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: message }
        ],
        model: 'model_name'
      });

      const reply = response.data.choices[0].message.content;
      io.emit('receiveMessage', reply);
    } catch (error) {
      console.error('Error:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
