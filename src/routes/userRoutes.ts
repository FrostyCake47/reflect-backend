import { Router } from 'express';
import { createUser, getUserById, getUsers, updateUserDevice, getUserDevices } from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/updateDevice', updateUserDevice);
router.get('/devices/:id', getUserDevices);

export default router;
