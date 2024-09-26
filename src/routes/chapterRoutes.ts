import { Router } from 'express';
import { getChapters, createChapter, deleteChapter, updateChapter} from '../controllers/chapterController';

const router: Router = Router();

router.get('/', getChapters);
router.post('/', createChapter);
router.delete('/', deleteChapter);
router.post('/update', updateChapter);

export default router;