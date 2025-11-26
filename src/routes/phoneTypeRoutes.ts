import { Router } from 'express';
import { PhoneTypeController } from '../controllers';

const router = Router();
const phoneTypeController = new PhoneTypeController();

/**
 * @swagger
 * /api/phone-types:
 *   get:
 *     summary: Listar todos los tipos de teléfono
 *     tags: [PhoneTypes]
 *     responses:
 *       200:
 *         description: Lista de tipos de teléfono
 */
router.get('/', phoneTypeController.getAllPhoneTypes);

/**
 * @swagger
 * /api/phone-types:
 *   post:
 *     summary: Crear un nuevo tipo de teléfono
 *     tags: [PhoneTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - typeName
 *             properties:
 *               typeName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tipo de teléfono creado
 *       409:
 *         description: El tipo ya existe
 */
router.post('/', phoneTypeController.createPhoneType);

export default router;
