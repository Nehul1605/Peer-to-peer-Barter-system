import express from 'express';
import passport from 'passport';
import { register, login, googleAuthCallback } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email'] 
}));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    googleAuthCallback
);

export default router;
