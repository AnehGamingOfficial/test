const readline = require('readline');
const ytdl = require('ytdl-core');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Entrez le lien de la vidéo YouTube : ', async (videoUrl) => {
  try {
    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo', filter: 'videoandaudio' });

    if (format && format.url) {
      console.log('Voici le lien de téléchargement direct :');
      console.log(format.url);
    } else {
      console.log("Impossible d'obtenir le lien de téléchargement.");
    }
  } catch (error) {
    console.error('Une erreur est survenue :', error);
  } finally {
    rl.close();
  }
});
