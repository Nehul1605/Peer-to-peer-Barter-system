import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { verifyJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', verifyJWT, getProfile);
router.put('/profile', verifyJWT, updateProfile);

export default router;
