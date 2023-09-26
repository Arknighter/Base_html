import musicMetadata from 'https://cdn.jsdelivr.net/npm/music-metadata@8.1.4/+esm'

async function readFlacLyrics(filePath) {
  try {
    const metadata = await musicMetadata.parseFile(filePath);
    const flacLyrics = metadata.common.lyrics;

    if (flacLyrics && flacLyrics.length > 0) {
      return flacLyrics[0].text;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

module.exports = readFlacLyrics;
