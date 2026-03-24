const STOCK_BASE = 'https://stock.example.com';
const WIKIMEDIA_BASE = 'https://wikimedia.example.com';
const PEXELS_BASE = 'https://pexels.example.com';
const AI_IMAGE_BASE = 'https://ai-images.example.com';

export const resolveMediaSource = ({ niche, index }) => {
  if (niche === 'crime') {
    return index % 2 === 0 ? 'wikimedia' : 'pexels';
  }

  if (niche === 'horror') {
    return index % 4 === 0 ? 'stock' : 'ai-image';
  }

  return 'stock';
};

export const buildMediaUrl = ({ source, prompt, index }) => {
  const slug = encodeURIComponent(`${prompt}-${index + 1}`.toLowerCase());

  switch (source) {
    case 'wikimedia':
      return `${WIKIMEDIA_BASE}/${slug}.jpg`;
    case 'pexels':
      return `${PEXELS_BASE}/${slug}.jpg`;
    case 'ai-image':
      return `${AI_IMAGE_BASE}/${slug}.jpg`;
    default:
      return `${STOCK_BASE}/${slug}.jpg`;
  }
};
