import { Router } from 'express';
import { createUser, getUserById, getUsers, updateUserDevice, getUserDevices, handleNewDevice } from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/updateDevice', updateUserDevice);
router.get('/devices/:id', getUserDevices);
router.post('/devices/handleNew', handleNewDevice)

export default router;
