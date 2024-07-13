import express from 'express';
import {
    register,
    login,
    getMe,
    updateUser,
    updatePassword,
    forgotPassword,
    resetPassword
} from '../controllers/auth-controller.mjs';
import {
    protect
} from '../middleware/authorization.mjs';

const router = express.Router();

router.get('/me', protect, getMe);

router.post('/register', register);
router.post('/login', login);


router.post('/forgot-password', forgotPassword);

router.put('/reset-password/:token', resetPassword);
router.put('/update-user', protect, updateUser);
router.put('/update-password', protect, updatePassword);



export default router