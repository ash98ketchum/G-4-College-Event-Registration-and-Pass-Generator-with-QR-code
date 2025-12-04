import { Router } from 'express';
import { createTicket, validateScan } from '../controllers/ticket.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

// create ticket (attendee flow) - protected (user must be logged in)
router.post('/create', requireAuth, createTicket);

// validate ticket (scanner) - can be protected with volunteer auth in production
router.post('/validate', validateScan);

export default router;
