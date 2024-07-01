import express from 'express';
import {register, login, getMe,logout} from '../controllers/auth-controller.mjs';
import { protect } from '../middleware/authorization.mjs';

const router = express.Router();


router.post('/register',  register);
router.post('/login',  login);
router.get('/me', protect , getMe);
// router.post('/logout',  logout);


export default router