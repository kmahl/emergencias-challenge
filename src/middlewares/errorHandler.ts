import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { logger } from '../utils/logger';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // Zod validation errors
  if (err instanceof ZodError) {
    const errors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return res.status(400).json({
      error: 'Validation Error',
      details: errors,
    });
  }

  // Prisma unique constraint errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({
        error: 'Conflict',
        message: 'A record with this value already exists',
      });
    }

    if (err.code === 'P2025') {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Record not found',
      });
    }

    if (err.code === 'P2003') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Foreign key constraint failed',
      });
    }
  }

  // Custom application errors
  if (err.message.includes('not found')) {
    return res.status(404).json({
      error: 'Not Found',
      message: err.message,
    });
  }

  if (err.message.includes('already exists')) {
    return res.status(409).json({
      error: 'Conflict',
      message: err.message,
    });
  }

  // Default server error
  logger.error('Unhandled error', err);
  return res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
  });
};
