// backend/seed.ts
import mongoose from 'mongoose';
import Event from './src/models/Event';
import { connectDB } from './src/config/db';

const seedEvents = async () => {
  await connectDB();

  const events = [
    {
      name: 'Tech Hackathon 2024',
      description: 'A 48-hour coding marathon for developers to build innovative solutions',
      date: new Date('2024-12-15'),
      venue: 'Tech Hub, Building A',
      capacity: 200,
      instructions: [
        'Please arrive 30 minutes before the event starts',
        'Bring a valid ID proof',
        'Follow the event code of conduct',
        'No outside food or beverages allowed',
        'Laptops and chargers are mandatory'
      ]
    },
    {
      name: 'Design Workshop 2024',
      description: 'Learn UI/UX design principles from industry experts',
      date: new Date('2024-12-20'),
      venue: 'Creative Space, Room 101',
      capacity: 50,
      instructions: [
        'Bring your laptop with design software installed',
        'Arrive 15 minutes early for registration',
        'Networking session after the workshop'
      ]
    }
  ];

  await Event.deleteMany({});
  const createdEvents = await Event.insertMany(events);
  console.log(`✅ Seeded ${createdEvents.length} events`);
  
  mongoose.connection.close();
};

seedEvents().catch(console.error);