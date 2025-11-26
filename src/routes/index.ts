import { Router } from 'express';
import personRoutes from './personRoutes';
import activityRoutes from './activityRoutes';
import phoneTypeRoutes from './phoneTypeRoutes';

const router = Router();

router.use('/persons', personRoutes);
router.use('/activities', activityRoutes);
router.use('/phone-types', phoneTypeRoutes);

export default router;
