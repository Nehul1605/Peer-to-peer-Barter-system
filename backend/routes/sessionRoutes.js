import express from 'express';
import { createSessionRequest, getMySessions, updateSessionStatus, addReview, generateJitsiToken } from '../controllers/sessionController.js';
import { verifyJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(verifyJWT);

router.post('/request', createSessionRequest);
router.get('/', getMySessions);
router.put('/:id', updateSessionStatus);
router.post('/:sessionId/review', addReview);
router.get('/:sessionId/token', generateJitsiToken);

export default router;
