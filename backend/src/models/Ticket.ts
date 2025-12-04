// backend/src/models/Ticket.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ITicket extends Document {
  userId: mongoose.Types.ObjectId;
  eventId: mongoose.Types.ObjectId;
  registrationNumber: string;
  qrCode: string;
  ticketUrl: string;
  isScanned: boolean;
  scannedAt?: Date;
  scannedBy?: string;
  createdAt: Date;
}

const TicketSchema = new Schema<ITicket>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  registrationNumber: { type: String, required: true },
  qrCode: { type: String, required: true },
  ticketUrl: { type: String, required: true },
  isScanned: { type: Boolean, default: false },
  scannedAt: { type: Date },
  scannedBy: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Compound index to ensure one ticket per user per event
TicketSchema.index({ userId: 1, eventId: 1 }, { unique: true });

export default mongoose.model<ITicket>('Ticket', TicketSchema);