// loads env into process.env; call this early
import dotenv from 'dotenv';
import path from 'path';

const envPath = process.env.NODE_ENV === 'test'
  ? path.resolve(process.cwd(), '.env.test')
  : path.resolve(process.cwd(), '.env');

dotenv.config({ path: envPath });

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/event-system';
export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'dev-token-secret';
export const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret';
export const EMAIL_USER = process.env.EMAIL_USER || '';
export const EMAIL_PASS = process.env.EMAIL_PASS || '';
