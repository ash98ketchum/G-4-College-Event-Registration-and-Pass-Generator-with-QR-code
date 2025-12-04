// backend/src/controllers/ticket.controller.ts
import { Request, Response } from 'express';
import User from '../models/User';
import Event from '../models/Event';
import Ticket from '../models/Ticket';
import Payment from '../models/Payment';
import { generateQRCode, generateTicketUrl } from '../utils/qr';
import { successResponse, errorResponse } from '../utils/responses';
import { config } from '../config/env';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, college, eventId } = req.body;

    // Validate input
    if (!name || !email || !phone || !eventId) {
      return errorResponse(res, 'All fields are required', 400);
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return errorResponse(res, 'Event not found', 404);
    }

    if (!event.isActive) {
      return errorResponse(res, 'Event is not active', 400);
    }

    if (event.registeredCount >= event.capacity) {
      return errorResponse(res, 'Event is full', 400);
    }

    // Generate registration number
    const registrationNumber = `REG${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Create or find user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        phone,
        college,
        registrationNumber
      });
    }

    // Check if user already has a ticket for this event
    const existingTicket = await Ticket.findOne({ userId: user._id, eventId });
    if (existingTicket) {
      return errorResponse(res, 'You are already registered for this event', 400);
    }

    // Create payment record (simplified - marking as completed)
    const payment = await Payment.create({
      userId: user._id,
      eventId,
      amount: 0, // Free event
      status: 'completed',
      paymentMethod: 'free'
    });

    // Generate ticket URL
    const ticketUrl = generateTicketUrl('EventHub', event.name, registrationNumber);
    const fullTicketUrl = `${config.baseUrl}/ticket/${ticketUrl}`;

    // Generate QR code
    const qrCode = await generateQRCode(fullTicketUrl);

    // Create ticket
    const ticket = await Ticket.create({
      userId: user._id,
      eventId,
      registrationNumber,
      qrCode,
      ticketUrl: fullTicketUrl
    });

    // Update event registered count
    event.registeredCount += 1;
    await event.save();

    // Populate ticket data
    const populatedTicket = await Ticket.findById(ticket._id)
      .populate('userId')
      .populate('eventId');

    return successResponse(res, populatedTicket, 'Registration successful', 201);
  } catch (error: any) {
    console.error('Registration error:', error);
    return errorResponse(res, error.message || 'Registration failed', 500);
  }
};

export const getTicket = async (req: Request, res: Response) => {
  try {
    const { registrationNumber } = req.params;

    const ticket = await Ticket.findOne({ registrationNumber })
      .populate('userId')
      .populate('eventId');

    if (!ticket) {
      return errorResponse(res, 'Ticket not found', 404);
    }

    return successResponse(res, ticket, 'Ticket retrieved successfully');
  } catch (error: any) {
    console.error('Get ticket error:', error);
    return errorResponse(res, error.message || 'Failed to retrieve ticket', 500);
  }
};

export const scanTicket = async (req: Request, res: Response) => {
  try {
    const { ticketUrl } = req.body;
    const { scannedBy } = req.body; // Volunteer name/ID

    if (!ticketUrl) {
      return errorResponse(res, 'Ticket URL is required', 400);
    }

    // Extract ticket URL from full URL if needed
    const urlParts = ticketUrl.split('/ticket/');
    const ticketUrlPath = urlParts.length > 1 ? urlParts[1] : ticketUrl;

    const ticket = await Ticket.findOne({ ticketUrl: { $regex: ticketUrlPath, $options: 'i' } })
      .populate('userId')
      .populate('eventId');

    if (!ticket) {
      return errorResponse(res, 'Invalid ticket', 404);
    }

    if (ticket.isScanned) {
      return errorResponse(res, `Ticket already scanned at ${ticket.scannedAt?.toLocaleString()}`, 400);
    }

    // Mark ticket as scanned
    ticket.isScanned = true;
    ticket.scannedAt = new Date();
    ticket.scannedBy = scannedBy || 'Unknown Volunteer';
    await ticket.save();

    return successResponse(res, ticket, 'Ticket scanned successfully');
  } catch (error: any) {
    console.error('Scan ticket error:', error);
    return errorResponse(res, error.message || 'Failed to scan ticket', 500);
  }
};

export const getAllTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.find()
      .populate('userId')
      .populate('eventId')
      .sort({ createdAt: -1 });

    return successResponse(res, tickets, 'Tickets retrieved successfully');
  } catch (error: any) {
    console.error('Get all tickets error:', error);
    return errorResponse(res, error.message || 'Failed to retrieve tickets', 500);
  }
};