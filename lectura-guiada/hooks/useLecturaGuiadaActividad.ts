import { useState } from 'react';
import { useAudioRecorder } from './useAudioRecorder';

export function useLecturaGuiadaActividad({
  elementos,
  tipoAudio,
  endpointBackend,
  compararTexto,
}: {
  elementos: { texto: string; emoji?: string }[];
  tipoAudio: string;
  endpointBackend: string;
  compararTexto?: (reconocido: string, esperado: string) => boolean;
}) {
  const [indice, setIndice] = useState(0);
  const [enviando, setEnviando] = useState(false);
  const [snackbar, setSnackbar] = useState<{ visible: boolean, mensaje: string, exito?: boolean }>({ visible: false, mensaje: '', exito: undefined });
  const { audioUri, grabando, cargando, comenzarGrabacion, detenerGrabacion, limpiarGrabacion } = useAudioRecorder();

  const elementoActual = elementos[indice];

  function mostrarSnackbar(mensaje: string, exito?: boolean) {
    setSnackbar({ visible: true, mensaje, exito });
    setTimeout(() => setSnackbar(s => ({ ...s, visible: false })), 2200);
  }

  async function enviarAudioAlBackend(uri: string) {
    if (!uri) return;
    setEnviando(true);
    try {
      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      const formData = new FormData();
      formData.append('audio', {
        uri,
        name: `grabacion.${fileType}`,
        type: tipoAudio,
      } as any);

      const response = await fetch(endpointBackend, {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData,
      });
      const data = await response.json();
      if (response.ok && data.text) {
        const textoReconocido = (data.text || '').trim().toLowerCase();
        const textoEsperado = elementoActual.texto.trim().toLowerCase();
        const esCorrecto = compararTexto
          ? compararTexto(textoReconocido, textoEsperado)
          : textoReconocido === textoEsperado;
        if (esCorrecto) {
          mostrarSnackbar('¡Muy bien! Pronunciaste correctamente 🎉', true);
        } else {
          mostrarSnackbar(`Reconocido: "${data.text}". Intenta de nuevo.`, false);
        }
      } else {
        mostrarSnackbar('No se pudo reconocer. Intenta nuevamente.', false);
      }
    } catch (e) {
      mostrarSnackbar('Error al enviar el audio. Verifica tu conexión.', false);
    } finally {
      setEnviando(false);
      limpiarGrabacion();
      await new Promise(res => setTimeout(res, 200));
    }
  }

  function siguiente() {
    limpiarGrabacion();
    setIndice((prev) => (prev + 1) % elementos.length);
  }

  return {
    indice,
    elementoActual,
    enviando,
    snackbar,
    audioUri,
    grabando,
    cargando,
    comenzarGrabacion,
    detenerGrabacion,
    limpiarGrabacion,
    enviarAudioAlBackend,
    siguiente,
    setSnackbar,
  };
}
