const fs = require('fs');
const path = require('path');

const filePath = '/tmp/views.json';

function initFileIfMissing() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ views: 0 }));
  }
}

module.exports = (req, res) => {
  try {
    initFileIfMissing();

    const fileData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileData);
    data.views += 1;

    fs.writeFileSync(filePath, JSON.stringify(data));

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ views: data.views });
  } catch (error) {
    console.error('Error in API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
