// backend/src/controllers/event.controller.ts
import { Request, Response } from 'express';
import Event from '../models/Event';
import { successResponse, errorResponse } from '../utils/responses';

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, description, date, venue, capacity, instructions } = req.body;

    const event = await Event.create({
      name,
      description,
      date,
      venue,
      capacity,
      instructions: instructions || []
    });

    return successResponse(res, event, 'Event created successfully', 201);
  } catch (error: any) {
    console.error('Create event error:', error);
    return errorResponse(res, error.message || 'Failed to create event', 500);
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find({ isActive: true }).sort({ date: 1 });
    return successResponse(res, events, 'Events retrieved successfully');
  } catch (error: any) {
    console.error('Get events error:', error);
    return errorResponse(res, error.message || 'Failed to retrieve events', 500);
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return errorResponse(res, 'Event not found', 404);
    }

    return successResponse(res, event, 'Event retrieved successfully');
  } catch (error: any) {
    console.error('Get event error:', error);
    return errorResponse(res, error.message || 'Failed to retrieve event', 500);
  }
};