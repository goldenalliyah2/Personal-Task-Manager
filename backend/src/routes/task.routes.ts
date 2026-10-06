import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from '../controllers/task.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

// All task routes require authentication
router.use(authenticate);

// Create a task
router.post('/', createTask);

// Get all tasks belonging to the logged-in user
router.get('/', getTasks);

// Get one task belonging to the logged-in user
router.get('/:id', getTask);

// Update one task belonging to the logged-in user
router.patch('/:id', updateTask);

// Delete one task belonging to the logged-in user
router.delete('/:id', deleteTask);

export default router;