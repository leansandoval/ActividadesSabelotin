import { Audio } from 'expo-av';
import type { Recording } from 'expo-av/build/Audio';
import { useState } from 'react';

const CARGANDO = true;
const ESTADO_PERMISO_OTORGADO = 'granted';
const GRABANDO = true;
const NO_CARGANDO = false;
const NO_GRABANDO = false;

export function useAudioRecorder(endpointBackend?: string) {
    const [audioUri, setAudioUri] = useState<string | null>(null);
    const [cargando, setCargando] = useState(NO_CARGANDO);
    const [grabacion, setGrabacion] = useState<Recording | null>(null);
    const [grabando, setGrabando] = useState(NO_GRABANDO);
    const [sonido, setSonido] = useState<Audio.Sound | null>(null);

    async function comenzarGrabacion() {
        try {
            setCargando(CARGANDO);
            const servidorDisponible = await verificarServidorDisponible();
            if (!servidorDisponible) {
                setCargando(NO_CARGANDO);
                alert('El servidor no está disponible. Verifica tu conexión.');
                return;
            }
            const permiso = await Audio.requestPermissionsAsync();
            if (permiso.status !== ESTADO_PERMISO_OTORGADO) {
                setCargando(NO_CARGANDO);
                alert('Se requiere permiso para grabar audio');
                return;
            }
            // Atributos especificos para iOS, pero no afecta en Android, siemplemente se ignoran
            await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            console.log('Grabación iniciada');
            setGrabacion(recording);
            setGrabando(GRABANDO);
        } catch (e) {
            alert('Error al iniciar la grabación');
        } finally {
            setCargando(NO_CARGANDO);
        }
    }

    async function detenerGrabacion(): Promise<string | null> {
        setCargando(CARGANDO);
        try {
            if (!grabacion) {
                setCargando(NO_CARGANDO);
                return null;
            }
            await grabacion.stopAndUnloadAsync();
            const uri = grabacion.getURI();
            setAudioUri(uri ?? null);
            setGrabando(NO_GRABANDO);
            setGrabacion(null);
            console.log('Grabación detenida, URI:', uri);
            return uri ?? null;
        } catch (e) {
            alert('Error al detener la grabación');
            return null;
        } finally {
            setCargando(NO_CARGANDO);
        }
    }

    // Reproduce la grabación actual
    // Funcionaba como debug, se removió de la interfaz
    async function reproducirGrabacion() {
        if (!audioUri) return;
        try {
            setCargando(CARGANDO);
            if (sonido) {
                await sonido.unloadAsync();
                setSonido(null);
            }
            const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
            setSonido(sound);
            await sound.playAsync();
        } catch (e) {
            alert('No se pudo reproducir la grabación');
        } finally {
            setCargando(NO_CARGANDO);
        }
    }

    function limpiarGrabacion() {
        setAudioUri(null);
        setGrabando(false);
        setGrabacion(null);
        setSonido(null);
    }

    async function verificarServidorDisponible(): Promise<boolean> {
        if (!endpointBackend) {
            return true; // Si no hay endpoint, asumimos que está disponible
        }
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 segundos para verificación

            const response = await fetch(endpointBackend.replace('/audio', '/health'), {
                method: 'GET',
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            return response.ok;
        } catch {
            return false;
        }
    }


    return { audioUri, grabando, cargando, comenzarGrabacion, detenerGrabacion, limpiarGrabacion };
}
