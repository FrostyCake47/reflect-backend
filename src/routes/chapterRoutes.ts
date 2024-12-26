import { Router } from 'express';
import { getChapters, createChapter, deleteChapter, updateChapter, importChapters, exportChapters} from '../controllers/chapterController';

const router: Router = Router();

router.get('/', getChapters);
router.post('/', createChapter);
router.delete('/', deleteChapter);
router.post('/update', updateChapter);
router.get('/import', importChapters);
router.post('/export', exportChapters);

export default router;