const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const path = require('path');

const inputFile = path.join(__dirname, 'entrada.m4a');  // o el formato que obtenga expo-av
const outputFile = path.join(__dirname, 'salida.wav');

ffmpeg(inputFile)
  .toFormat('wav')
  .on('error', (err) => {
    console.error('Error en la conversión: ' + err.message);
  })
  .on('end', () => {
    console.log('Conversión completada. Archivo creado en:', outputFile);
  })
  .save(outputFile);
