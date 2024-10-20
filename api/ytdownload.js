const ytdl = require('ytdl-core');

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle the preflight (OPTIONS) request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { videoUrl } = req.query;

  if (!videoUrl || !ytdl.validateURL(videoUrl)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

try {
  const info = await ytdl.getInfo(videoUrl);
  console.log('Video Info:', info); // Log the fetched video info
  const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo', filter: 'videoandaudio' });

  if (format && format.url) {
    return res.status(200).json({ downloadUrl: format.url });
  } else {
    return res.status(404).json({ error: 'Download link not found' });
  }
} catch (error) {
  console.error('Error fetching download link:', error); // Log the error details
  return res.status(500).json({ error: error.message }); // Return the actual error message for debugging
}

}
