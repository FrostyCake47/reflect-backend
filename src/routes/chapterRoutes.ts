import { Router } from 'express';
import { getChapters, createChapter, deleteChapter } from '../controllers/chapterController';

const router: Router = Router();

router.get('/:uid', getChapters);
router.post('/', createChapter);
router.delete('/', deleteChapter);

export default router;