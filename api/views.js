// Simple persistent counter with cookie tracking
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'views.json');

export default async (req, res) => {
  try {
    // Initialize or read count
    let data = { count: 0 };
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath));
    }

    // Only increment for new visitors
    if (!req.cookies?.visited) {
      data.count += 1;
      fs.writeFileSync(filePath, JSON.stringify(data));
    }

    // Set cookie (1 day expiry)
    res.setHeader('Set-Cookie', 'visited=true; Max-Age=86400; Path=/');
    res.status(200).json({ views: data.count });
    
  } catch (error) {
    res.status(500).json({ error: "Counter failed" });
  }
};
