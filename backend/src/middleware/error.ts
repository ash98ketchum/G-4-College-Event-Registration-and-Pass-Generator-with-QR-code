import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('ERROR:', err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
};
