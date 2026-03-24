const API_BASE = 'http://localhost:3001';

const post = async (path, payload) => {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
};

export const createScript = (payload) => post('/script', payload);
export const createScenes = (payload) => post('/scenes', payload);
export const attachMedia = (payload) => post('/media', payload);
export const attachTts = (payload) => post('/tts', payload);
export const createPreview = (payload) => post('/render-preview', payload);
