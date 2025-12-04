// backend/src/routes/event.routes.ts
import express from 'express';
import { createEvent, getAllEvents, getEventById } from '../controllers/event.controller';

const router = express.Router();

router.post('/', createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);

export default router;