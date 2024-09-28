import { Router } from 'express';
import { getAllEntriesOfChapter, createEntry, deleteEntry, updateEntry } from '../controllers/entryController'; 

const router: Router = Router();

router.get('/', getAllEntriesOfChapter);
router.post('/', createEntry);
router.delete('/', deleteEntry);
router.post('/update', updateEntry);

export default router;