const ytdl = require('ytdl-core');

export default async function handler(req, res) {
  const { url } = req.query;

  if (!ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo', filter: 'videoandaudio' });

    if (format && format.url) {
      return res.status(200).json({ downloadUrl: format.url });
    } else {
      return res.status(404).json({ error: 'Download link not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching download link' });
  }
}
