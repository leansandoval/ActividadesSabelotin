import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StyleSheet, View, Animated, Modal, Text, ImageBackground } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { useState } from 'react';

const COLOR_SNACKBAR_EXITO = '#388E3C';
const COLOR_SNACKBAR_ERROR = '#F44336';
const DURACION_ANIMACION_SNACKBAR = 250;
const MENSAJE_BOTON_DETENER_Y_ENVIAR = '⏹️ Detener y enviar';
const MENSAJE_BOTON_ENVIANDO = 'Enviando...';
const MENSAJE_BOTON_ESCUCHAR = '🔊 Escuchar';
const MENSAJE_BOTON_GRABAR = '🎤 Grabar';
const MENSAJE_BOTON_SIGUIENTE = 'Siguiente';
const MENSAJE_BOTON_VOLVER = 'Volver al menú';
const TIME_OUT_SNACKBAR = 4000;

export function LecturaGuiadaActividadView({
  titulo,
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
  reproducirAudio,
  mostrarPopup,
  setMostrarPopup,
  listoParaGrabar,
  backgroundImage,
  colorTexto = '#FFFFFF',
  colorBoton = '#000000',
  colorFondoCaja = '#797575ff',
  errorConexion,
}: any) {
  const snackbarAnim = useState(new Animated.Value(0))[0];
  const enProcesoDeGrabacion = enviando || grabando || cargando;

  // Animación snackbar
  if (snackbar.visible) {
    Animated.timing(snackbarAnim, {
      duration: DURACION_ANIMACION_SNACKBAR,
      toValue: 1,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(snackbarAnim, {
        duration: DURACION_ANIMACION_SNACKBAR,
        toValue: 0,
        useNativeDriver: true,
      }).start(() => setSnackbar((s: any) => ({ ...s, visible: false })));
    }, TIME_OUT_SNACKBAR);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}>

      {/* Mostrar error de conexión si existe */}
      {errorConexion && (
        <View style={{
          backgroundColor: '#FFEBEE',
          borderLeftWidth: 4,
          borderLeftColor: '#F44336',
          marginHorizontal: 16,
          marginTop: 16,
          padding: 12,
        }}>
          <ThemedText style={{ color: '#F44336', textAlign: 'center', fontSize: 16 }}>
            ⚠️ Problemas de conexión con el servidor
          </ThemedText>
        </View>
      )}

      {/* Popup de Grabación */}
      <Modal
        animationType="fade"
        onRequestClose={() => setMostrarPopup(false)}
        transparent
        visible={mostrarPopup}>
        <View style={{
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)',
          flex: 1,
          justifyContent: 'center',
        }}>
          <View style={{
            alignItems: 'center',
            backgroundColor: colorBoton,
            borderRadius: 18,
            elevation: 5,
            minWidth: 260,
            padding: 32,
          }}>
            <Text style={{
              color: colorTexto,
              fontFamily: 'GilroyBold',
              fontSize: 22,
              marginBottom: 16,
            }}>
              🎤 Escuchando...
            </Text>
            <ActivityIndicator
              color={colorTexto}
              size="large"
              style={{ marginBottom: 24 }} />
            <Pressable
              accessibilityLabel="Detener grabación"
              disabled={enviando}
              onPress={detenerGrabacion}
              style={[styles.botonAudio, { backgroundColor: colorFondoCaja }]}>
              <ThemedText style={[styles.textoBotonAudio, { color: colorTexto }]}>
                {MENSAJE_BOTON_DETENER_Y_ENVIAR}
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Snackbar animado */}
      {snackbar.visible && (
        <Animated.View
          style={{
            alignItems: 'center',
            backgroundColor: snackbar.exito ? COLOR_SNACKBAR_EXITO : COLOR_SNACKBAR_ERROR,
            borderRadius: 16,
            bottom: 40,
            elevation: 8,
            left: 30,
            opacity: snackbarAnim,
            paddingHorizontal: 24,
            paddingVertical: 18,
            position: 'absolute',
            right: 30,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 8,
            transform: [{ translateY: snackbarAnim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
            zIndex: 100,
          }}>
          <Text style={{
            color: '#fff',
            fontFamily: 'GilroyBold',
            fontSize: 18,
            textAlign: 'center'
          }}>
            {snackbar.mensaje}
          </Text>
        </Animated.View>
      )}

      <ImageBackground
        resizeMode="cover"
        source={backgroundImage}
        style={{ flex: 1 }}>

        <ThemedView style={styles.container}>

          {/* Título */}
          <ThemedText style={styles.titulo}>
            {titulo}
          </ThemedText>

          {/* Caja del elemento actual */}
          <ThemedView style={[styles.palabraBox, { backgroundColor: colorFondoCaja }]}>
            <ThemedText style={[styles.palabra, { color: colorTexto }]}>
              {elementoActual.texto} {elementoActual.emoji}
            </ThemedText>
            <Pressable
              style={[styles.botonAudio, { backgroundColor: colorBoton }]}
              onPress={reproducirAudio}
              accessibilityLabel="Escuchar">
              <ThemedText style={[styles.textoBotonAudio, { color: colorTexto }]}>
                {MENSAJE_BOTON_ESCUCHAR}
              </ThemedText>
            </Pressable>
          </ThemedView>

          {/* Botón de Grabación */}
          <ThemedView style={{
            alignItems: 'center',
            backgroundColor: 'transparent',
            marginBottom: 8
          }}>
            {(cargando || grabando) ? (<ActivityIndicator color="#388E3C" size="large" />) : (
              <Pressable
                accessibilityLabel="Comenzar grabación"
                disabled={!listoParaGrabar}
                onPress={comenzarGrabacion}
                style={[
                  styles.botonAudio,
                  !listoParaGrabar && styles.botonDeshabilitado,
                  { backgroundColor: colorBoton },
                ]}>
                <ThemedText style={[styles.textoBotonAudio, { color: colorTexto }]}>
                  {enviando ? MENSAJE_BOTON_ENVIANDO : MENSAJE_BOTON_GRABAR}
                </ThemedText>
              </Pressable>
            )}
          </ThemedView>

          {/* Botones de Siguiente y Volver */}
          <ThemedView
            pointerEvents={enProcesoDeGrabacion ? 'none' : 'auto'}
            style={styles.botonSiguienteYVolver}>
            <Pressable
              accessibilityLabel="Siguiente"
              disabled={enProcesoDeGrabacion}
              onPress={siguiente}
              style={[
                styles.botonAudio,
                enProcesoDeGrabacion && styles.botonDeshabilitado,
                { backgroundColor: colorBoton }
              ]}>
              <ThemedText style={[styles.textoBotonAudio, { color: colorTexto }]}>
                {MENSAJE_BOTON_SIGUIENTE}
              </ThemedText>
            </Pressable>
            <Link href="/" asChild>
              <ThemedText style={[styles.botonVolver, enProcesoDeGrabacion && styles.botonDeshabilitado]}>
                {MENSAJE_BOTON_VOLVER}
              </ThemedText>
            </Link>
          </ThemedView>

        </ThemedView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#FFD966',
    borderRadius: 16,
    color: '#333',
    fontFamily: 'GilroyBold',
    fontSize: 22,
    marginBottom: 8,
    overflow: 'hidden',
    paddingHorizontal: 25,
    paddingVertical: 14,
    textAlign: 'center',
  },
  botonAudio: {
    backgroundColor: '#FFD966',
    borderRadius: 16,
    marginTop: 6,
    paddingHorizontal: 25,
    paddingVertical: 14,
  },
  botonDeshabilitado: {
    backgroundColor: '#aaa',
    opacity: 0.5,
  },
  botonSiguienteYVolver: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    gap: 12,
    marginTop: 16,
    marginBottom: 24,
  },
  botonVolver: {
    color: '#0a7ea4',
    fontFamily: 'GilroyBold',
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 48,
    justifyContent: 'space-between',
  },
  palabra: {
    color: '#F57C00',
    fontFamily: 'GilroyBold',
    fontSize: 36,
    paddingBottom: 24,
    paddingTop: 24,
    textAlign: 'center',
  },
  palabraBox: {
    alignItems: 'center',
    backgroundColor: '#FFF9C4',
    borderRadius: 18,
    elevation: 2,
    gap: 16,
    marginBottom: 12,
    paddingVertical: 20,
    paddingHorizontal: 60,
  },
  textoBotonAudio: {
    color: '#333',
    fontFamily: 'GilroyBold',
    fontSize: 22,
  },
  titulo: {
    color: '#388E3C',
    fontFamily: 'GilroyBold',
    fontSize: 28,
    paddingBottom: 24,
    paddingTop: 24,
    textAlign: 'center',
  },
});
