import os
import requests
from dotenv import load_dotenv

# Cargar el token desde .env
load_dotenv()
WIT_TOKEN = os.getenv("WIT_TOKEN")

# Archivo de audio en formato WAV o MP3 (mono, 16 kHz recomendado)
AUDIO_FILE = "salida.wav"

# Endpoint de Wit.ai Speech
url = "https://api.wit.ai/speech?v=20240915"   # v=fecha de la versión

# Cabeceras
headers = {
    "Authorization": f"Bearer {WIT_TOKEN}",
    "Content-Type": "audio/wav"   # o "audio/mpeg" según tu archivo
}

# Enviar el audio
with open(AUDIO_FILE, "rb") as f:
    resp = requests.post(url, headers=headers, data=f)

# Respuesta
if resp.status_code == 200:
    try:
        data = resp.json()
        print("Texto reconocido:")
        print(data.get("text", "(sin texto)"))
    except Exception as e:
        import json
        print("Error al parsear JSON:", e)
        print("Procesando respuesta cruda...")
        # Separar los objetos JSON individuales
        raw = resp.text.strip()
        # Cada objeto empieza con '{' y termina con '}', separados por saltos de línea
        # Usamos una técnica simple para extraerlos
        objetos = []
        buffer = ''
        nivel = 0
        for c in raw:
            if c == '{':
                if nivel == 0:
                    buffer = ''
                nivel += 1
            if nivel > 0:
                buffer += c
            if c == '}':
                nivel -= 1
                if nivel == 0:
                    objetos.append(buffer)
        for obj in objetos:
            try:
                data = json.loads(obj)
                if data.get("type") == "FINAL_UNDERSTANDING":
                    print(data.get("text", "(sin texto)"))
            except Exception as e:
                print("Error procesando objeto:", e)
                print(obj)
else:
    print("Error:", resp.status_code)
    print("Respuesta cruda:")
    print(resp.text)
