from gtts import gTTS

texto = "Hola, esto es una prueba de texto a voz usando gTTS. Hola Leandro"
tts = gTTS(text=texto, lang='es')
tts.save("salida.mp3")
print("Audio guardado como salida.mp3")
