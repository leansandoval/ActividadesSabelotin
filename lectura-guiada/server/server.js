// Backend para recibir audio, convertirlo a WAV y enviarlo a Wit.ai para reconocimiento de voz
// Ejecutar con: node server.js
// Requiere tener un archivo .env con la variable WIT_TOKEN y ffmpeg instalado
const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const app = express();
const upload = multer({ dest: 'uploads/' });

const BLOQUE_ENTENDIMIENTO_FINAL = 'FINAL_UNDERSTANDING';
const CODIGO_BAD_REQUEST = 400;
const CODIGO_INTERNAL_SERVER_ERROR = 500;
const EXTENSION_WAV = '.wav';
const FRECUENCIA_AUDIO = 16000; // (Mono, 16 kHz)
const PUERTO = process.env.PUERTO || 4000;
const TIMEOUT_POST_WIT = 20000; // 20 segundos
const URL_WIT = 'https://api.wit.ai/speech?v=20240915';
const WIT_TOKEN = process.env.WIT_TOKEN;

function dividirBloquesJson(respuesta) {
    const resultados = [];
    let contadorDeLlaves = 0;
    let buffer = '';    // Acumulador de texto
    for (const caracter of respuesta) {
        if (caracter === '{') {
            contadorDeLlaves++;
            buffer += caracter;
        } else if (caracter === '}') {
            contadorDeLlaves--;
            buffer += caracter;
            // Si contadorDeLlaves vuelve a 0, cerramos un objeto
            if (contadorDeLlaves === 0) {
                resultados.push(buffer.trim());
                buffer = '';
            }
        } else {
            if (contadorDeLlaves > 0) {
                buffer += caracter;
            }
        }
    }
    return resultados;
}

function extraerTextoReconocido(witResp) {
    let textoReconocido = '';
    if (typeof witResp.data === 'object' && witResp.data.text) {
        textoReconocido = witResp.data.text;
    } else if (typeof witResp.data === 'string') {
        const bloques = dividirBloquesJson(witResp.data);
        for (const bloque of bloques) {
            try {
                //console.log('Procesando bloque:', bloque);
                const obj = JSON.parse(bloque);
                if (obj.type === BLOQUE_ENTENDIMIENTO_FINAL) {
                    textoReconocido = obj.text;
                }
            } catch (e) {
                console.error('Bloque inválido:', e);
            }
        }
    }
    return textoReconocido;
}

// Endpoint para recibir audio
app.post('/audio', upload.single('audio'), async (req, res) => {
    if (!req.file) {
        return res.status(CODIGO_BAD_REQUEST).json({ error: 'No se envió archivo de audio.' });
    }
    const rutaArchivoEntrada = req.file.path;
    const rutaArchivoSalida = rutaArchivoEntrada + EXTENSION_WAV;

    // Convertir a WAV
    ffmpeg(rutaArchivoEntrada)
        .audioChannels(1)
        .audioFrequency(FRECUENCIA_AUDIO)
        .toFormat('wav')
        .on('start', (cmd) => { })
        .on('end', async () => {
            try {
                // Leer el archivo WAV
                const audioData = fs.readFileSync(rutaArchivoSalida);
                // Enviar a Wit.ai
                const witRespuesta = await axios.post(
                    URL_WIT,
                    audioData,
                    {
                        headers: {
                            'Authorization': `Bearer ${WIT_TOKEN}`,
                            'Content-Type': 'audio/wav',
                        },
                        timeout: TIMEOUT_POST_WIT
                    }
                );
                console.log('Respuesta de Wit.ai recibida:', witRespuesta.data);

                // Limpiar archivos temporales
                fs.unlinkSync(rutaArchivoEntrada);
                fs.unlinkSync(rutaArchivoSalida);

                // Extraer solo el texto final reconocido
                let textoReconocido = extraerTextoReconocido(witRespuesta);
                console.log('Texto final:', textoReconocido);
                res.json({ text: textoReconocido });
            } catch (err) {
                fs.unlinkSync(rutaArchivoEntrada);
                if (fs.existsSync(rutaArchivoSalida)) fs.unlinkSync(rutaArchivoSalida);
                res.status(CODIGO_INTERNAL_SERVER_ERROR).json({ error: 'Error procesando audio', detalles: err.message });
            }
        })
        .on('error', (err) => {
            fs.unlinkSync(rutaArchivoEntrada);
            res.status(CODIGO_INTERNAL_SERVER_ERROR).json({ error: 'Error en la conversión', detalles: err.message });
        })
        .save(rutaArchivoSalida);
});

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en puerto ${PUERTO}`);
    console.log(`Token de Wit.ai: ${WIT_TOKEN}`);
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});
