# Tarea 07 — Integración de servicios de IA con Azure

Aplicación web con Node.js y Express que integra dos servicios de IA con Azure:

- **OCR** — extrae texto de imágenes a partir de una URL pública.
- **PLN (Análisis de sentimientos)** — clasifica el sentimiento de un texto (positivo, negativo o neutral) con puntuaciones de confianza.

## Instalación
Clonamos el repositorio: 
```bash
git clone https://github.com/danielayala-06/Tarea-07-azure-cognitive-services.git
```
Luego de clonar el repo instalamos las dependencias: 

```bash
npm install
```

Renombrar el archivo `env` a => `.env` en la raíz del proyecto con las siguientes variables:

```env
COGNITIVE_KEY=tu_clave_computer_vision
COGNITIVE_ENDPOINT=https://tu-servicio.cognitiveservices.azure.com

FOUNDRY_KEY=tu_clave_language
FOUNDRY_ENPOINT=https://tu-servicio.services.ai.azure.com

PORT=3000
```

## Ejecución

```bash
node app.js
```

Luego abrir en el navegador `http://localhost:3000`

## Estructura

```
├── app/
│   ├── ocr.js            # Lógica de llamada a Azure Computer Vision
│   └── text-analizer.js  # Lógica de llamada a Azure Language
├── public/
│   ├── index.html        # Landing — selección de servicio
│   ├── views/
│   │   ├── ocr.html      # Vista de reconocimiento de texto
│   │   └── lnp.html      # Vista de análisis de sentimientos
│   └── js/
│       ├── api/
│       │   ├── ocr.js          # Fetch al endpoint /api/ocr
│       │   └── sentimientos.js # Fetch al endpoint /api/analizar
│       ├── ocr-ui.js     # UI del OCR
│       └── ui.js         # UI del analizador de sentimientos
└── app.js                # Servidor Express y rutas
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/` | Landing page |
| `GET` | `/ocr` | Vista de OCR |
| `GET` | `/sentimientos` | Vista de análisis de sentimientos |
| `POST` | `/api/ocr` | Extrae texto de una imagen — body: `{ url }` |
| `POST` | `/api/analizar` | Analiza sentimientos de un texto — body: `{ texto }` |
