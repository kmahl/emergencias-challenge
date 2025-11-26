import { z } from 'zod';

// Schema para crear tipo de teléfono
export const createPhoneTypeSchema = z.object({
  typeName: z.string().min(1, 'Phone type name is required'),
});
