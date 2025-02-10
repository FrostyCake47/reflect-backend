import {Router} from 'express';
import {imageUpload, imageDelete} from '../controllers/imageController';
import multer from 'multer';

const router = Router();
const upload = multer();

router.post('/upload', upload.single('image'), imageUpload);
router.post('/delete', imageDelete);

export default router;