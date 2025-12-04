import { Schema, model, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description?: string;
  price: number;
  capacity: number;
  registrations: number;
  startDate?: Date;
  endDate?: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, default: 0 },
    capacity: { type: Number, default: 0 },
    registrations: { type: Number, default: 0 },
    startDate: Date,
    endDate: Date
  },
  { timestamps: true }
);

export default model<IEvent>('Event', EventSchema);
