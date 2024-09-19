import { Router } from 'express';
import { getAllEntriesOfChapter, createEntry } from '../controllers/entryController'; 

const router: Router = Router();

router.get('/:chapterId', getAllEntriesOfChapter);
router.post('/', createEntry);
//router.delete('/', deleteChapter);
//router.post('/update', updateChapter);

export default router;