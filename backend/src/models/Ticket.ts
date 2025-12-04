import { Schema, model, Document } from 'mongoose';

export interface ITicket extends Document {
  userId: Schema.Types.ObjectId;
  eventId: Schema.Types.ObjectId;
  tid: string;      // ticket UUID
  qrData: string;   // signed token
  scanned: boolean;
  issuedAt: Date;
  scannedAt?: Date;
}

const TicketSchema = new Schema<ITicket>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    tid: { type: String, required: true, unique: true },
    qrData: { type: String, required: true },
    scanned: { type: Boolean, default: false },
    issuedAt: { type: Date, default: Date.now },
    scannedAt: Date
  },
  { timestamps: true }
);

export default model<ITicket>('Ticket', TicketSchema);
