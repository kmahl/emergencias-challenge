import { z } from 'zod';

// Schema para crear teléfono
export const createPhoneSchema = z.object({
  number: z.string().min(1, 'Phone number is required'),
  typeName: z.string().min(1, 'Phone type is required'),
});

// Schema para crear dirección
export const createAddressSchema = z.object({
  locality: z.string().min(1, 'Locality is required'),
  street: z.string().min(1, 'Street is required'),
  number: z.string().min(1, 'Street number is required'),
  notes: z.string().optional(),
});

// Schema para crear persona
export const createPersonSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Date of birth must be in format DD/MM/YYYY'),
  email: z.string().email('Invalid email format'),
  phones: z.array(createPhoneSchema).optional(),
  addresses: z.array(createAddressSchema).optional(),
});

// Schema para actualizar persona
export const updatePersonSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  dateOfBirth: z
    .string()
    .min(1)
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Date of birth must be in format DD/MM/YYYY')
    .optional(),
  email: z.string().email('Invalid email format').optional(),
});

// Schema para búsqueda por datos personales
export const searchPersonSchema = z
  .object({
    q: z.string().optional(),
    email: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    dateOfBirth: z
      .string()
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Date of birth must be in format DD/MM/YYYY')
      .optional()
      .or(z.literal('')),
    phone: z.string().optional(),
    phoneType: z.string().optional(),
  })
  .refine((data) => Object.values(data).some((val) => val !== undefined && val !== ''), {
    message: 'At least one search parameter is required',
  });

// Schema para búsqueda por teléfono
export const searchPhoneSchema = z.object({
  number: z.string().min(1, 'Phone number is required'),
  typeName: z.string().min(1, 'Phone type is required'),
});

// Schema para validar email en parámetro de ruta
export const emailParamSchema = z.object({
  email: z.string().email('Invalid email format'),
});

// Schema para validar ID en parámetro de ruta
export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a valid number'),
});
