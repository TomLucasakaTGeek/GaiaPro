const express = require('express');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const extractTextFromPdf = require('../extractors/extractTextFromPdf');
const extractTextFromImage = require('../extractors/extractTextFromImage');
const convertMathNotations = require('../extractors/convertMathNotations');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

async function sendDataToGaianet(data) {
    const response = await axios.post('https://llama.us.gaianet.network/v1/chat/completions', {
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: data }
        ]
    }, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

router.post('/', upload.single('file'), async (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    let text;
    if (req.file.mimetype === 'application/pdf') {
        text = await extractTextFromPdf(filePath);
    } else {
        text = await extractTextFromImage(filePath);
    }
    const convertedText = convertMathNotations(text);
    const response = await sendDataToGaianet(convertedText);
    res.json(response);
});

module.exports = router;
