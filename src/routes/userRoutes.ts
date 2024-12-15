import { Router } from 'express';
import { createUser, getUserById, getUsers, updateUserDevice, getUserDevices, handleNewDevice, updateEncryptionMode, getUserSettings } from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/updateDevice', updateUserDevice);
router.get('/devices/:id', getUserDevices);
router.post('/devices/handleNew', handleNewDevice)
router.post('/encryptionMode', updateEncryptionMode)
router.get('/settings/:id', getUserSettings)

export default router;
