import { Router } from 'express';
import { createEvent, listEvents, getEventStats } from '../controllers/event.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

// public list
router.get('/', listEvents);

// protected create (for hackathon MVP you can skip requireAuth if you want)
router.post('/', requireAuth, createEvent);
router.get('/:id/stats', requireAuth, getEventStats);

export default router;
