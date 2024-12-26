import { Router } from 'express';
import { getChapters, createChapter, deleteChapter, updateChapter, importChapters} from '../controllers/chapterController';

const router: Router = Router();

router.get('/', getChapters);
router.post('/', createChapter);
router.delete('/', deleteChapter);
router.post('/update', updateChapter);
router.get('/import', importChapters);

export default router;