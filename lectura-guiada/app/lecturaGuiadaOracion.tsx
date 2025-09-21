import { useLecturaGuiadaActividad } from '../hooks/useLecturaGuiadaActividad';
import { LecturaGuiadaActividadView } from '../components/LecturaGuiadaActividadView';
import * as Speech from 'expo-speech';
import Constants from 'expo-constants';
import React, { useState } from 'react';

const ORACIONES = [
  { texto: 'El perro duerme' },
  { texto: 'La luna brilla en el cielo' },
  { texto: 'Me gusta leer libros' },
  { texto: 'La flor es roja' },
  { texto: 'Hoy hace mucho calor' },
  { texto: 'El gato juega con la pelota' },
  { texto: 'La casa es grande' },
  { texto: 'El sol sale por la mañana' },
  { texto: 'La maestra escribe en el pizarrón' },
  { texto: 'Voy al parque con mis amigos' },
];
const TIPO_DE_AUDIO_GRABACION_EXPO = 'audio/x-m4a';
const { IP_PC, IP_ANDROID_STUDIO, PUERTO } = Constants.expoConfig?.extra || {};

export default function LecturaGuiadaOracion() {
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
    elementos: ORACIONES,
    tipoAudio: TIPO_DE_AUDIO_GRABACION_EXPO,
    endpointBackend: `http://${IP_PC}:${PUERTO}/audio`,
    compararTexto: (reconocido, esperado) =>
      reconocido.replace(/[.,;:!?¿¡"]/g, '').trim().toLowerCase() ===
      esperado.replace(/[.,;:!?¿¡"]/g, '').trim().toLowerCase(),
    onErrorConexion: setErrorConexion,
  });

  const listoParaGrabar = !enviando && !grabando && !cargando && !audioUri;

  function reproducirAudio() {
    Speech.speak(elementoActual.texto, { language: 'es-ES', rate: 0.9, pitch: 1.1 });
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
      titulo="📝 Repetí la oración"
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
      backgroundImage={require('../assets/images/actividad-lectura-guiada-oracion.jpg')}
      colorTexto="#fdfdfdff"
      colorBoton="#093577ff"
      colorFondoCaja="#6da2c9ff"
    />
  );
}
