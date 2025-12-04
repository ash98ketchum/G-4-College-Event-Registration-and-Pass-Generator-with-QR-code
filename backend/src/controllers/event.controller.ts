import type { Request, Response } from 'express';
import Event from '../models/Event';

export const createEvent = async (req: Request, res: Response) => {
  const { title, description, price, capacity, startDate, endDate } = req.body;
  if (!title) return res.status(400).json({ message: 'Title required' });
  const event = await Event.create({ title, description, price: price || 0, capacity: capacity || 0, startDate, endDate });
  res.json({ event });
};

export const listEvents = async (_req: Request, res: Response) => {
  const events = await Event.find().sort({ createdAt: -1 });
  res.json({ events });
};

export const getEventStats = async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json({ registrations: event.registrations, capacity: event.capacity });
};
