import express from 'express';
import { getProfile, updateProfile, getPublicProfile } from '../controllers/userController.js';
import { verifyJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', verifyJWT, getProfile);
router.put('/profile', verifyJWT, updateProfile);
router.get('/:userId/public', verifyJWT, getPublicProfile);

export default router;
