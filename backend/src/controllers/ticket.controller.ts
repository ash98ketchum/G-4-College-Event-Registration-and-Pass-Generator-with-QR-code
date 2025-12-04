import type { Request, Response } from 'express';
import crypto from 'crypto';
import Ticket from '../models/Ticket';
import Event from '../models/Event';
import User from '../models/User';
import { createSignedToken, verifySignedToken } from '../utils/token';
import { generateQR } from '../utils/qr';
import { sendTicketEmail } from '../utils/email';

/**
 * Create ticket: expects { userId, eventId }
 * Generates tid, signed token, qrData, saves ticket, increments event.registrations
 */
export const createTicket = async (req: Request, res: Response) => {
  const { userId, eventId } = req.body;
  if (!userId || !eventId) return res.status(400).json({ message: 'userId and eventId required' });

  const user = await User.findById(userId);
  const event = await Event.findById(eventId);
  if (!user || !event) return res.status(404).json({ message: 'User or Event not found' });

  if (event.capacity && event.registrations >= event.capacity) {
    return res.status(400).json({ message: 'Event is full' });
  }

  const tid = crypto.randomUUID();
  const payload = { tid, eventId: event._id.toString(), userId: user._id.toString(), iat: Date.now() };
  const signed = createSignedToken(payload);
  const qrDataUrl = await generateQR(signed);

  const ticket = await Ticket.create({
    userId: user._id,
    eventId: event._id,
    tid,
    qrData: signed,
    scanned: false
  });

  event.registrations = (event.registrations || 0) + 1;
  await event.save();

  // send email (best-effort)
  const html = `<p>Hi ${user.name},</p>
    <p>Your ticket for <strong>${event.title}</strong> is attached below.</p>
    <img src="${qrDataUrl}" alt="QR Ticket" />
    <p>Ticket ID: ${tid}</p>`;
  try {
    await sendTicketEmail(user.email, `Ticket: ${event.title}`, html);
  } catch (e) {
    console.warn('Failed to send email:', e);
  }

  res.json({ ticket, qr: qrDataUrl });
};

/**
 * Get user tickets: expects userId param
 * Returns all tickets for a specific user with populated event and user data
 */
export const getUserTickets = async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ message: 'userId required' });

  try {
    const tickets = await Ticket.find({ userId })
      .populate('eventId')
      .populate('userId')
      .sort({ issuedAt: -1 });

    return res.json({ tickets });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch tickets', error: err });
  }
};

/**
 * Get single ticket by ID: expects ticketId param
 * Returns a single ticket with populated event and user data
 */
export const getTicketById = async (req: Request, res: Response) => {
  const { ticketId } = req.params;
  if (!ticketId) return res.status(400).json({ message: 'ticketId required' });

  try {
    const ticket = await Ticket.findById(ticketId)
      .populate('eventId')
      .populate('userId');

    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    return res.json({ ticket });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch ticket', error: err });
  }
};

/**
 * Validate scan: expects { token }
 * Verifies token signature, finds ticket by tid, checks scanned flag.
 */
export const validateScan = async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ result: 'invalid', message: 'Token required' });

  const payload = verifySignedToken(token);
  if (!payload || !payload.tid) return res.status(400).json({ result: 'invalid' });

  const ticket = await Ticket.findOne({ tid: payload.tid });
  if (!ticket) return res.status(404).json({ result: 'invalid' });

  if (ticket.scanned) {
    return res.status(409).json({ result: 'duplicate', scannedAt: ticket.scannedAt });
  }

  ticket.scanned = true;
  ticket.scannedAt = new Date();
  await ticket.save();

  return res.json({ result: 'allowed', ticketId: ticket.tid, userId: ticket.userId });
};
