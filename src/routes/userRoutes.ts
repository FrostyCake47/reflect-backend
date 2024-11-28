import { Router } from 'express';
import { createUser, getUserById, getUsers, updateUserDevice } from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/updateDevice', updateUserDevice);

export default router;
