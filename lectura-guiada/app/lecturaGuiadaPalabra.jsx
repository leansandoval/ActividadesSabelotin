import { useLecturaGuiadaActividad } from '../hooks/useLecturaGuiadaActividad';
import { LecturaGuiadaActividadView } from '../components/LecturaGuiadaActividadView';
import * as Speech from 'expo-speech';
import Constants from 'expo-constants';
import React, { useState } from 'react';

const PALABRAS = [
  { texto: 'Burro', emoji: '🐴' },
  { texto: 'Casa', emoji: '🏠' },
  { texto: 'Flor', emoji: '🌸' },
  { texto: 'Gato', emoji: '🐱' },
  { texto: 'Libro', emoji: '📚' },
  { texto: 'Luna', emoji: '🌙' },
  { texto: 'Mano', emoji: '🖐️' },
  { texto: 'Perro', emoji: '🐶' },
  { texto: 'Sol', emoji: '☀️' },
];
const TIPO_DE_AUDIO_GRABACION_EXPO = 'audio/x-m4a';
const { IP_PC, IP_ANDROID_STUDIO, PUERTO } = Constants.expoConfig?.extra || {};

export default function LecturaGuiadaPalabra() {
  const [errorConexion, setErrorConexion] = useState(false);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const {
    elementoActual,
    grabando,
    cargando,
    enviando,
    comenzarGrabacion,
    detenerGrabacion,
    enviarAudioAlBackend,
    siguienteElemento,
    snackbar,
    setSnackbar,
    audioUri,
  } = useLecturaGuiadaActividad({
    elementos: PALABRAS,
    tipoAudio: TIPO_DE_AUDIO_GRABACION_EXPO,
    endpointBackend: `http://${IP_PC}:${PUERTO}/audio`,
    onErrorConexion: setErrorConexion,
  });

  const listoParaGrabar = !enviando && !grabando && !cargando && !audioUri;

  function reproducirAudio() {
    Speech.speak(elementoActual.texto, { language: 'es-ES', rate: 0.8, pitch: 1.1 });
  }

  async function handleComenzarGrabacion() {
    if (!listoParaGrabar) {
      return;
    }
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
      titulo="📝 Repetí la palabra"
      elementoActual={elementoActual}
      grabando={grabando}
      cargando={cargando}
      enviando={enviando}
      comenzarGrabacion={handleComenzarGrabacion}
      detenerGrabacion={handleDetenerGrabacion}
      enviarAudioAlBackend={enviarAudioAlBackend}
      siguienteElemento={siguienteElemento}
      snackbar={snackbar}
      setSnackbar={setSnackbar}
      reproducirAudio={reproducirAudio}
      mostrarPopup={mostrarPopup}
      setMostrarPopup={setMostrarPopup}
      listoParaGrabar={listoParaGrabar}
      backgroundImage={require('../assets/images/actividad-lectura-guiada-palabra.jpg')}
      colorTexto='#F57C00'
      colorBoton='#FFD966'
      colorFondoCaja='#FFF9C4'
      errorConexion={errorConexion}
    />
  );
}
