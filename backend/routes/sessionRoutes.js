import express from 'express';
import { createSessionRequest, getMySessions, updateSessionStatus, addReview } from '../controllers/sessionController.js';
import { verifyJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(verifyJWT);

router.post('/request', createSessionRequest);
router.get('/', getMySessions);
router.put('/:id', updateSessionStatus);
router.post('/:sessionId/review', addReview);

export default router;
