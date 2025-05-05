// Import required modules
import fs from 'fs';
import path from 'path';

// Path to store view count data
const viewsPath = path.join(process.cwd(), 'views.json');

export default async function handler(req, res) {
  try {
    // 1. Initialize or read existing count
    let viewsData = { count: 0 };
    if (fs.existsSync(viewsPath)) {
      viewsData = JSON.parse(fs.readFileSync(viewsPath, 'utf-8'));
    }

    // 2. Check if user is new (via cookie)
    const hasVisited = req.cookies?.hasVisited;
    
    // 3. Only increment for new visitors
    if (!hasVisited) {
      viewsData.count += 1;
      fs.writeFileSync(viewsPath, JSON.stringify(viewsData));
    }

    // 4. Set cookie and return count
    res.setHeader('Set-Cookie', 'hasVisited=true; Max-Age=86400; Path=/'); // 24h cookie
    res.status(200).json({ 
      views: viewsData.count,
      updated: !hasVisited // For debugging
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to update views' });
  }
}
