import { buildMediaUrl, resolveMediaSource } from '../utils/nicheMedia.js';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export const createScript = ({ topic, niche, duration, language }) => {
  const targetSeconds = clamp(Number(duration) || 30, 10, 600);
  const approxSentences = clamp(Math.ceil(targetSeconds / 6), 3, 18);

  const lines = [
    `Welcome back! Today we explore ${topic} through a ${niche} lens.`,
    `In this quick breakdown, we focus on the key moment that changed everything.`,
    `You'll discover surprising details and practical insights you can use right away.`
  ];

  while (lines.length < approxSentences) {
    lines.push(`Scene ${lines.length + 1}: A short ${niche} storytelling beat about ${topic}.`);
  }

  lines.push(`If this helped, like and subscribe for more ${niche} stories.`, `Language: ${language}.`);

  return lines.join(' ');
};

export const scriptToScenes = ({ script, niche }) => {
  const sentenceChunks = script
    .split(/(?<=[.!?])\s+/)
    .map((segment) => segment.trim())
    .filter(Boolean);

  return sentenceChunks.map((text, index) => {
    const duration = 5 + (index % 2 === 0 ? 0 : 3);

    return {
      id: `scene-${index + 1}`,
      text,
      duration,
      media: {
        source: resolveMediaSource({ niche, index }),
        url: '',
        prompt: text
      },
      audio: {
        voice: 'neutral',
        url: ''
      }
    };
  });
};

export const mediaForScenes = ({ scenes, niche }) => {
  return scenes.map((scene, index) => {
    const source = resolveMediaSource({ niche, index });
    return {
      ...scene,
      media: {
        ...scene.media,
        source,
        url: buildMediaUrl({ source, prompt: scene.text, index })
      }
    };
  });
};

export const audioForScenes = ({ scenes, voice }) => {
  return scenes.map((scene, index) => ({
    ...scene,
    audio: {
      voice,
      url: `https://tts.example.com/audio/${voice}/${index + 1}.mp3`
    }
  }));
};

export const previewForScenes = ({ scenes }) => {
  const totalDuration = scenes.reduce((sum, scene) => sum + (scene.duration || 0), 0);

  return {
    previewUrl: `https://render.example.com/previews/${Date.now()}.mp4`,
    quality: 'low',
    totalDuration,
    sceneCount: scenes.length
  };
};
