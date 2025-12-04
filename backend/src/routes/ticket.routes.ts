import { Router } from 'express';
import { createTicket, validateScan, getUserTickets, getTicketById } from '../controllers/ticket.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

// create ticket (attendee flow) - protected (user must be logged in)
router.post('/create', requireAuth, createTicket);

// get user tickets
router.get('/user/:userId', requireAuth, getUserTickets);

// get single ticket by ID
router.get('/:ticketId', requireAuth, getTicketById);

// validate ticket (scanner) - can be protected with volunteer auth in production
router.post('/validate', validateScan);

export default router;
