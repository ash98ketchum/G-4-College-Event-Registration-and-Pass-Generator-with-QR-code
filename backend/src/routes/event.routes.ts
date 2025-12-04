import { Router } from 'express';
import { 
  createEvent, 
  listEvents, 
  getEventById,
  updateEvent,
  deleteEvent,
  getEventStats 
} from '../controllers/event.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', listEvents);
router.get('/:id', getEventById);

// Protected routes (require authentication)
router.post('/', requireAuth, createEvent);
router.put('/:id', requireAuth, updateEvent);
router.delete('/:id', requireAuth, deleteEvent);
router.get('/:id/stats', requireAuth, getEventStats);

export default router;
