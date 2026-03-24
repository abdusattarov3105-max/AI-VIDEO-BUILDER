import {
  createScript,
  scriptToScenes,
  mediaForScenes,
  audioForScenes,
  previewForScenes
} from '../services/videoService.js';

export const generateScript = (req, res) => {
  const { topic, niche, duration = 30, language = 'English' } = req.body;

  if (!topic || !niche) {
    return res.status(400).json({ error: 'topic and niche are required' });
  }

  const script = createScript({ topic, niche, duration, language });
  return res.json({ script });
};

export const generateScenes = (req, res) => {
  const { script, niche } = req.body;

  if (!script) {
    return res.status(400).json({ error: 'script is required' });
  }

  const scenes = scriptToScenes({ script, niche });
  return res.json({ scenes });
};

export const fetchMedia = (req, res) => {
  const { scenes, niche } = req.body;

  if (!Array.isArray(scenes)) {
    return res.status(400).json({ error: 'scenes array is required' });
  }

  const enrichedScenes = mediaForScenes({ scenes, niche });
  return res.json({ scenes: enrichedScenes });
};

export const generateTts = (req, res) => {
  const { scenes, voice = 'neutral' } = req.body;

  if (!Array.isArray(scenes)) {
    return res.status(400).json({ error: 'scenes array is required' });
  }

  const enrichedScenes = audioForScenes({ scenes, voice });
  return res.json({ scenes: enrichedScenes });
};

export const renderPreview = (req, res) => {
  const { scenes } = req.body;

  if (!Array.isArray(scenes) || scenes.length === 0) {
    return res.status(400).json({ error: 'non-empty scenes array is required' });
  }

  const preview = previewForScenes({ scenes });
  return res.json(preview);
};
