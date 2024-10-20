try {
    const info = await ytdl.getInfo(videoUrl);
    console.log(info); // Log the full info object for analysis
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo', filter: 'videoandaudio' });

    if (format && format.url) {
      return res.status(200).json({ downloadUrl: format.url });
    } else {
      return res.status(500).json({ error: 'Could not retrieve download link.' });
    }
} catch (error) {
    console.error('Error details:', error);
    return res.status(500).json({ error: 'An error occurred while processing the video.', details: error.message });
}
