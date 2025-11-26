import { Request, Response } from 'express';
import { PhoneTypeService } from '../services';
import { asyncHandler } from '../middlewares/asyncHandler';
import { createPhoneTypeSchema } from '../validators';

export class PhoneTypeController {
  private phoneTypeService: PhoneTypeService;

  constructor() {
    this.phoneTypeService = new PhoneTypeService();
  }

  // GET /api/phone-types - Listar todos
  getAllPhoneTypes = asyncHandler(async (_req: Request, res: Response) => {
    const phoneTypes = await this.phoneTypeService.getAllPhoneTypes();
    res.status(200).json(phoneTypes);
  });

  // POST /api/phone-types - Crear tipo
  createPhoneType = asyncHandler(async (req: Request, res: Response) => {
    const validated = createPhoneTypeSchema.parse(req.body);
    const phoneType = await this.phoneTypeService.createPhoneType(validated.typeName);
    res.status(201).json(phoneType);
  });
}
