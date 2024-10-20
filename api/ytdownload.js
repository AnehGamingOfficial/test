const ytdl = require('ytdl-core');

export default async function handler(req, res) {
  const { videoUrl } = req.query; // Get video URL from the query parameter

  if (!videoUrl) {
    return res.status(400).json({ error: 'No video URL provided' });
  }

  try {
    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo', filter: 'videoandaudio' });

    if (format && format.url) {
      return res.status(200).json({ downloadUrl: format.url });
    } else {
      return res.status(500).json({ error: 'Could not retrieve download link.' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while processing the video.' });
  }
}
