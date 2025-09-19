/*import { useLecturaGuiadaActividad } from '../hooks/useLecturaGuiadaActividad';
import { LecturaGuiadaActividadView } from '../components/LecturaGuiadaActividadView';
import * as Speech from 'expo-speech';
import Constants from 'expo-constants';
import React, { useState } from 'react';

const LETRAS = [
  { texto: 'A' }, { texto: 'B' }, { texto: 'C' }, { texto: 'D' }, { texto: 'E' }, { texto: 'F' },
  { texto: 'G' }, { texto: 'H' }, { texto: 'I' }, { texto: 'J' }, { texto: 'K' }, { texto: 'L' },
  { texto: 'M' }, { texto: 'N' }, { texto: 'O' }, { texto: 'P' }, { texto: 'Q' }, { texto: 'R' },
  { texto: 'S' }, { texto: 'T' }, { texto: 'U' }, { texto: 'V' }, { texto: 'W' }, { texto: 'X' },
  { texto: 'Y' }, { texto: 'Z' },
];
const TIPO_DE_AUDIO_GRABACION_EXPO = 'audio/x-m4a';
const { IP_PC, PUERTO } = Constants.expoConfig?.extra || {};

export default function LecturaGuiadaLetra() {
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const {
    elementoActual,
    grabando,
    cargando,
    enviando,
    comenzarGrabacion,
    detenerGrabacion,
    enviarAudioAlBackend,
    siguiente,
    snackbar,
    setSnackbar,
    audioUri,
  } = useLecturaGuiadaActividad({
    elementos: LETRAS,
    tipoAudio: TIPO_DE_AUDIO_GRABACION_EXPO,
    endpointBackend: `http://${IP_PC}:${PUERTO}/audio`,
    compararTexto: (reconocido, esperado) => reconocido.replace(/[^a-zA-Z]/g, '').toLowerCase() === esperado.toLowerCase()
  });

  const listoParaGrabar = !enviando && !grabando && !cargando && !audioUri;

  function reproducirAudio() {
    Speech.speak(elementoActual.texto, { language: 'es-ES', rate: 0.8, pitch: 1.1 });
  }

  async function handleComenzarGrabacion() {
    if (!listoParaGrabar) return;
    setMostrarPopup(true);
    await comenzarGrabacion();
  }

  async function handleDetenerGrabacion() {
    setMostrarPopup(false);
    const uri = await detenerGrabacion();
    if (uri) {
      await enviarAudioAlBackend(uri);
    }
  }

  return (
    <LecturaGuiadaActividadView
      titulo="🔤 Repetí la letra"
      elementoActual={elementoActual}
      grabando={grabando}
      cargando={cargando}
      enviando={enviando}
      comenzarGrabacion={handleComenzarGrabacion}
      detenerGrabacion={handleDetenerGrabacion}
      enviarAudioAlBackend={enviarAudioAlBackend}
      siguiente={siguiente}
      snackbar={snackbar}
      setSnackbar={setSnackbar}
      reproducirAudio={reproducirAudio}
      mostrarPopup={mostrarPopup}
      setMostrarPopup={setMostrarPopup}
      listoParaGrabar={listoParaGrabar}
      backgroundImage={require('../assets/images/actividad-lectura-guiada-palabra.jpg')}
      colorTexto="#1976D2"
      colorBoton="#7dacf1ff"
      colorFondoCaja="#E3F2FD"
    />
  );
}*/
