// backend/src/routes/ticket.routes.ts
import express from 'express';
import { registerUser, getTicket, scanTicket, getAllTickets } from '../controllers/ticket.controller';

const router = express.Router();

router.post('/register', registerUser);
router.get('/:registrationNumber', getTicket);
router.post('/scan', scanTicket);
router.get('/', getAllTickets);

export default router;