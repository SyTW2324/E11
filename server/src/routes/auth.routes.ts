import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();

router.post('/', authController.handleLogin);

module.exports = router;