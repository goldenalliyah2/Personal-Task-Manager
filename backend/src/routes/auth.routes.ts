import { Router } from 'express';
import {
  loginUser,
  registerUser,
} from '../controllers/auth.controller.js';
import {
  authenticate,
  type AuthenticatedRequest,
} from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', authenticate, (req, res) => {
  const authenticatedRequest = req as AuthenticatedRequest;

  return res.status(200).json({
    success: true,
    message: 'Authentication successful',
    userId: authenticatedRequest.userId,
  });
});

export default router;