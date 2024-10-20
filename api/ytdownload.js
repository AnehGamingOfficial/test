const ytdl = require('ytdl-core');

export default async function handler(req, res) {
  const { videoUrl } = req.query;

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
    if (error.statusCode === 410) {
      return res.status(410).json({ error: 'The requested video is no longer available (Status 410).' });
    }
    console.error('Error details:', error);
    return res.status(500).json({ error: 'An error occurred while processing the video.', details: error.message });
  }
}
