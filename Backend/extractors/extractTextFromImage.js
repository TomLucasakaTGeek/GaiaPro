const Tesseract = require('tesseract.js');

async function extractTextFromImage(filePath) {
    const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
    return text;
}

module.exports = extractTextFromImage;