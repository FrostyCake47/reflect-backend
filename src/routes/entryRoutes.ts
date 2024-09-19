import { Router } from 'express';
import { getAllEntriesOfChapter, createEntry, deleteEntry } from '../controllers/entryController'; 

const router: Router = Router();

router.get('/:chapterId', getAllEntriesOfChapter);
router.post('/', createEntry);
router.delete('/', deleteEntry);
//router.post('/update', updateChapter);

export default router;