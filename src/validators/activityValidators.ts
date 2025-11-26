import { z } from 'zod';

// Schema para crear actividad
export const createActivitySchema = z.object({
  personId: z.number().int().positive('Person ID must be a positive integer'),
  activityType: z.enum(['call', 'meeting', 'email'], {
    errorMap: () => ({ message: "Activity type must be 'call', 'meeting', or 'email'" }),
  }),
  activityDate: z
    .string()
    .min(1, 'Activity date is required')
    .regex(
      /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/,
      'Activity date must be in format DD/MM/YYYY HH:MM:SS',
    ),
  description: z.string().optional(),
});

// Schema para búsqueda de actividades
export const searchActivitySchema = z.object({
  personId: z.number().int().positive('Person ID must be a positive integer'),
  activityType: z.enum(['call', 'meeting', 'email']).optional(),
});
