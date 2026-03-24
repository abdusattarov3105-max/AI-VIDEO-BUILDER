import { Router } from 'express';
import {
  generateScript,
  generateScenes,
  fetchMedia,
  generateTts,
  renderPreview
} from '../controllers/videoController.js';

const router = Router();

router.post('/script', generateScript);
router.post('/scenes', generateScenes);
router.post('/media', fetchMedia);
router.post('/tts', generateTts);
router.post('/render-preview', renderPreview);

export default router;
