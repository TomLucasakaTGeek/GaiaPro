const mathpixMarkdownIt = require('mathpix-markdown-it');

function convertMathNotations(text) {
    const md = mathpixMarkdownIt();
    return md.render(text);
}

module.exports = convertMathNotations;
