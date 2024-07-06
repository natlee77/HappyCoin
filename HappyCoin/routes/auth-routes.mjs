import express from 'express';
import {
    register,
    // login,
    // getMe,
    // forgotPassword,
    // resetPassword
} from '../controllers/auth-controller.mjs';
import {
    protect
} from '../middleware/authorization.mjs';

const router = express.Router();


router.post('/register', register);
// router.post('/login', login);
// router.post('/forgot-password', forgotPassword);

// router.put('/reset-password/:token', resetPassword);

// router.get('/me', protect, getMe);

export default router