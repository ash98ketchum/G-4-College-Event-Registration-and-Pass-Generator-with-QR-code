import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { connectDB } from './config/db';
import './config/env'; // loads env
import authRoutes from './routes/auth.routes';
import eventRoutes from './routes/event.routes';
import ticketRoutes from './routes/ticket.routes';
import { errorHandler } from './middleware/error';
import { PORT } from './config/env';

const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);

app.get('/', (_req, res) => res.json({ ok: true, msg: 'Event System Backend (TS)' }));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
