import type { Request, Response } from 'express';
import Event from '../models/Event';
import Ticket from '../models/Ticket';

/**
 * Create a new event
 */
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, price, capacity, startDate, endDate } = req.body;
    if (!title) return res.status(400).json({ message: 'Title required' });
    
    const event = await Event.create({ 
      title, 
      description, 
      price: price || 0, 
      capacity: capacity || 0, 
      startDate, 
      endDate,
      registrations: 0
    });
    
    res.status(201).json({ event, message: 'Event created successfully' });
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to create event', error: err.message });
  }
};

/**
 * List all events
 */
export const listEvents = async (_req: Request, res: Response) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json({ events });
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
};

/**
 * Get single event by ID
 */
export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    res.json({ event });
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to fetch event', error: err.message });
  }
};

/**
 * Update event
 */
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, price, capacity, startDate, endDate } = req.body;
    
    const event = await Event.findByIdAndUpdate(
      id,
      { title, description, price, capacity, startDate, endDate },
      { new: true, runValidators: true }
    );
    
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    res.json({ event, message: 'Event updated successfully' });
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to update event', error: err.message });
  }
};

/**
 * Delete event
 */
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Delete all tickets associated with this event
    await Ticket.deleteMany({ eventId: id });
    
    const event = await Event.findByIdAndDelete(id);
    
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    res.json({ message: 'Event and associated tickets deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to delete event', error: err.message });
  }
};

/**
 * Get event statistics
 */
export const getEventStats = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    // Get ticket statistics
    const totalTickets = await Ticket.countDocuments({ eventId: id });
    const scannedTickets = await Ticket.countDocuments({ eventId: id, scanned: true });
    
    res.json({ 
      registrations: event.registrations,
      capacity: event.capacity,
      totalTickets,
      scannedTickets,
      availableSlots: event.capacity - event.registrations
    });
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to fetch event stats', error: err.message });
  }
};
