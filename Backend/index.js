const express = require('express');
const extractRoute = require('./routes/extract');
const extractAndSendRoute = require('./routes/extractAndSend');

const app = express();

app.use('/extract', extractRoute);
app.use('/extract_and_send', extractAndSendRoute);

app.listen(8003, () => {
    console.log('Server is running on port 8003');
});