import { Router } from 'express';
import { ContactActivityController } from '../controllers';

const router = Router();
const activityController = new ContactActivityController();

/**
 * @swagger
 * /api/activities:
 *   post:
 *     summary: Crear una nueva actividad
 *     tags: [Activities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - personId
 *               - activityType
 *               - activityDate
 *             properties:
 *               personId:
 *                 type: integer
 *               activityType:
 *                 type: string
 *                 enum: [call, meeting, email]
 *               activityDate:
 *                 type: string
 *                 format: DD/MM/YYYY HH:MM:SS
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Actividad creada exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Persona no encontrada
 */
router.post('/', activityController.createActivity);

/**
 * @swagger
 * /api/activities/search:
 *   get:
 *     summary: Buscar actividades por contacto y tipo
 *     tags: [Activities]
 *     parameters:
 *       - in: query
 *         name: personId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: activityType
 *         schema:
 *           type: string
 *           enum: [call, meeting, email]
 *     responses:
 *       200:
 *         description: Lista de actividades encontradas
 *       404:
 *         description: Persona no encontrada
 */
router.get('/search', activityController.searchActivities);

export default router;
