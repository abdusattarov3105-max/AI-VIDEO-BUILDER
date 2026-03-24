# AI Video Builder (Monorepo)

A basic fullstack AI video builder scaffold inspired by VidAI/Vidrush.

## Structure

- `backend` → Node.js + Express API
- `frontend` → React + Vite UI

## Features

### Backend endpoints

- `POST /script` → generates a YouTube-style script
- `POST /scenes` → converts script into 5-10 second scenes
- `POST /media` → attaches media placeholders based on niche rules
- `POST /tts` → attaches TTS audio placeholders
- `POST /render-preview` → returns low-quality preview metadata/url

### Frontend pages

- Input form for topic, niche, duration, language, voice
- Scene editor with editable scene text/duration
- Preview panel with placeholder video player

## Niche rules

- `crime` → alternates `wikimedia` and `pexels`
- `horror` → mostly `ai-image` with some `stock`

## Run locally

```bash
npm run install:all
npm run dev:backend
npm run dev:frontend
```

- Backend: `http://localhost:3001`
- Frontend: `http://localhost:5173`

## Scene shape

```json
{
  "id": "scene-1",
  "text": "Scene narration",
  "duration": 8,
  "media": {
    "source": "wikimedia",
    "url": "https://...",
    "prompt": "Scene narration"
  },
  "audio": {
    "voice": "deep",
    "url": "https://..."
  }
}
```

## Notes

- External providers are placeholders only.
- No auth and no database are included yet.
