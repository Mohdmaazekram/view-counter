import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.resolve('./views.json');
  let count = 0;

  if (fs.existsSync(filePath)) {
    count = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  count++;
  fs.writeFileSync(filePath, JSON.stringify(count));

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({ views: count });
}
