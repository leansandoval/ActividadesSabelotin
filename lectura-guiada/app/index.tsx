import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Pressable } from 'react-native';

const COLOR_FONDO_HEADER_LIGHT = '#f1bfb9ff';
const COLOR_FONDO_HEADER_DARK = '#1D3D47';
const MENSAJE_TITULO = '¡Bienvenido a Lectura Guiada!';
const MENSAJE_SUBTITULO = 'Eligí una actividad para comenzar';
const MENSAJE_BOTON_LETRA = '🔤 Letras';
const MENSAJE_BOTON_PALABRA = '📝 Palabras'
const MENSAJE_BOTON_ORACION = '📖 Oraciones';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: COLOR_FONDO_HEADER_LIGHT, dark: COLOR_FONDO_HEADER_DARK }}
      headerImage={
        <View style={styles.logoContainer}>
          <Image
            contentFit="contain"
            source={require('@/assets/images/actividad-lectura-guiada.png')}
            style={styles.logo} />
        </View>
      }>

      <View style={styles.tituloBox}>
        <ThemedText style={styles.titulo}>
          {MENSAJE_TITULO}
        </ThemedText>
      </View>

      <ThemedText style={styles.subtitulo}>
        {MENSAJE_SUBTITULO}
      </ThemedText>

      <View style={styles.menu}>
        {/*<Link href="/lecturaGuiadaLetra" asChild>
          <Pressable style={[styles.boton, styles.botonLetra]} accessibilityRole="button">
            <ThemedText style={styles.textoBoton}>
              {MENSAJE_BOTON_LETRA}
            </ThemedText>
          </Pressable>
        </Link>*/}
        <Link href="/lecturaGuiadaPalabra" asChild>
          <Pressable style={[styles.boton, styles.botonPalabra]} accessibilityRole="button">
            <ThemedText style={styles.textoBoton}>
              {MENSAJE_BOTON_PALABRA}
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/lecturaGuiadaOracion" asChild>
          <Pressable style={[styles.boton, styles.botonOracion]} accessibilityRole="button">
            <ThemedText style={styles.textoBoton}>
              {MENSAJE_BOTON_ORACION}
            </ThemedText>
          </Pressable>
        </Link>
      </View>
    </ParallaxScrollView>
  );
}

const { height: windowHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  tituloBox: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
  titulo: {
    borderBottomColor: '#FFD966',
    borderBottomWidth: 5,
    borderRadius: 6,
    color: '#F57C00',
    fontFamily: 'GilroyBold',
    fontSize: 30,
    marginBottom: 8,
    paddingBottom: 15,
    paddingTop: 15,
    textAlign: 'center',
    textShadowColor: '#FFD966',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  logoContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    display: 'flex',
    height: windowHeight * 0.3, // 30% de la altura de pantalla
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    height: 160,
    maxWidth: 400,
    width: '100%',
  },
  subtitulo: {
    color: '#388E3C',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 24,
    fontFamily: 'GilroyBold',
    textAlign: 'center',
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  menu: {
    alignItems: 'center',
    gap: 36,
    marginTop: 24,
    marginBottom: 36,
    width: '100%',
  },
  boton: {
    alignItems: 'center',
    borderColor: '#fff',
    borderRadius: 28,
    borderWidth: 2,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    maxWidth: 340,
    minWidth: 240,
    paddingVertical: 36,
    paddingHorizontal: 36,
    shadowColor: '#F57C00',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    marginBottom: 12,
  },
  botonLetra: {
    backgroundColor: '#FFE066',
  },
  botonPalabra: {
    backgroundColor: '#7EE081',
  },
  botonOracion: {
    backgroundColor: '#6EC6FF',
  },
  textoBoton: {
    color: '#333',
    fontFamily: 'GilroyBold',
    fontSize: 26,
    letterSpacing: 0.5,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
