import { useState } from 'react';
import { useAudioRecorder } from './useAudioRecorder';

const ACTIVAR_FLAG_ENVIO = true;
const DESACTIVAR_FLAG_ENVIO = false;
const MENSAJE_SNACKBAR_EXITOSO = true;
const MENSAJE_SNACKBAR_FALLIDO = false;
const TIMEOUT_SIN_CONEXION = 20000; // 20 segundos
const TIMEOUT_MOSTRAR_SNACKBAR = 2200; // 2.2 segundos
const TIMEOUT_DELAY_SINCRONIZACION = 200; // 0.2 segundos

export function useLecturaGuiadaActividad({ elementos, tipoAudio, endpointBackend, compararTexto, onErrorConexion }: {
  elementos: { texto: string; emoji?: string }[];
  tipoAudio: string;
  endpointBackend: string;
  compararTexto?: (reconocido: string, esperado: string) => boolean;
  onErrorConexion: (error: boolean) => void;
}) {
  const [indice, setIndice] = useState(0);
  const [enviando, setEnviando] = useState(false);
  const [snackbar, setSnackbar] = useState<{ visible: boolean, mensaje: string, exito?: boolean }>({ visible: false, mensaje: '', exito: undefined });
  const { audioUri, grabando, cargando, comenzarGrabacion, detenerGrabacion, limpiarGrabacion } = useAudioRecorder(endpointBackend);
  const elementoActual = elementos[indice];

  function manejarError(error: any) {
    if (error.name === 'AbortError') {
      mostrarSnackbar('Timeout: El servidor no responde. Verifica tu conexión.', false);
    } else if (error.message.includes('Network request failed') || error.message.includes('fetch')) {
      mostrarSnackbar('Error de conexión: No se puede conectar al servidor.', false);
    } else {
      mostrarSnackbar('Error al enviar el audio. Intenta nuevamente.', false);
    }
  }

  function manejarRespuesta(data: any, response: Response) {
    onErrorConexion?.(false); // Resetear error si la respuesta es exitosa
    if (response.ok && data.text) {
      const textoReconocido = (data.text || '').trim().toLowerCase();
      const textoEsperado = elementoActual.texto.trim().toLowerCase();
      const esCorrecto = compararTexto ? compararTexto(textoReconocido, textoEsperado) : textoReconocido === textoEsperado;
      if (esCorrecto) {
        mostrarSnackbar('¡Muy bien! Pronunciaste correctamente 🎉', MENSAJE_SNACKBAR_EXITOSO);
      } else {
        mostrarSnackbar(`Reconocido: "${data.text}". Intenta de nuevo.`, MENSAJE_SNACKBAR_FALLIDO);
      }
    } else {
      mostrarSnackbar('No se pudo reconocer. Intenta nuevamente.', MENSAJE_SNACKBAR_FALLIDO);
    }
  }

  function mostrarSnackbar(mensaje: string, exito?: boolean) {
    setSnackbar({ visible: true, mensaje, exito });
    setTimeout(() => setSnackbar(s => ({ ...s, visible: false })), TIMEOUT_MOSTRAR_SNACKBAR);
  }

  function siguienteElemento() {
    limpiarGrabacion();
    setIndice((prev) => (prev + 1) % elementos.length);
  }

  function obtenerTipoDeArchivoDesdeUri(uri: string) {
    const uriParts = uri.split('.');
    return uriParts[uriParts.length - 1];
  }

  async function enviarAudioAlBackend(uri: string) {
    if (!uri) {
      return;
    }
    setEnviando(ACTIVAR_FLAG_ENVIO);

    // Crear un controller para cancelar la petición
    const controller = new AbortController(); 
    const timeoutEsperaConexion = setTimeout(() => controller.abort(), TIMEOUT_SIN_CONEXION);

    try {
      const tipoDeArchivo = obtenerTipoDeArchivoDesdeUri(uri);
      const formData = new FormData();
      formData.append('audio', {
        uri,
        name: `grabacion.${tipoDeArchivo}`,
        type: tipoAudio,
      } as any);
      const response = await fetch(endpointBackend, {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData,
        signal: controller.signal,
      });
      clearTimeout(timeoutEsperaConexion);
      const data = await response.json();
      manejarRespuesta(data, response);
    } catch (error: any) {
      clearTimeout(timeoutEsperaConexion);
      manejarError(error);
    } finally {
      setEnviando(DESACTIVAR_FLAG_ENVIO);
      limpiarGrabacion();
      await new Promise(res => setTimeout(res, TIMEOUT_DELAY_SINCRONIZACION));
    }
  }

  return {
    indice, elementoActual, enviando, snackbar, audioUri, grabando, cargando,
    comenzarGrabacion, detenerGrabacion, limpiarGrabacion, enviarAudioAlBackend, siguienteElemento, setSnackbar
  };
}
