import { Request, Response } from 'express';
import { ContactActivityService } from '../services';
import { asyncHandler } from '../middlewares/asyncHandler';
import { createActivitySchema, searchActivitySchema } from '../validators';

export class ContactActivityController {
  private activityService: ContactActivityService;

  constructor() {
    this.activityService = new ContactActivityService();
  }

  // POST /api/activities - Crear actividad
  createActivity = asyncHandler(async (req: Request, res: Response) => {
    const validated = createActivitySchema.parse(req.body);
    const activity = await this.activityService.createActivity(validated);
    res.status(201).json(activity);
  });

  // GET /api/activities/search - Buscar actividades
  searchActivities = asyncHandler(async (req: Request, res: Response) => {
    const validated = searchActivitySchema.parse({
      personId: Number(req.query.personId),
      activityType: req.query.activityType,
    });
    const activities = await this.activityService.searchActivities(validated);
    res.status(200).json(activities);
  });
}
