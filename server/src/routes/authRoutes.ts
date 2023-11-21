// server/src/routes/authRoutes.ts

import express from 'express';
import * as authController from '../controllers/authController';
import { authenticateToken } from '../utils/authMiddleware';


const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

// Ruta protegida que requiere autenticación
router.get('/user-info', authenticateToken, authController.getUserInfo);

export default router;
