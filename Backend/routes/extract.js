const express = require('express');
const multer = require('multer');
const path = require('path');
const extractTextFromPdf = require('../extractors/extractTextFromPdf');
const extractTextFromImage = require('../extractors/extractTextFromImage');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    let text;
    if (req.file.mimetype === 'application/pdf') {
        text = await extractTextFromPdf(filePath);
    } else {
        text = await extractTextFromImage(filePath);
    }
    res.json({ text });
});

module.exports = router;