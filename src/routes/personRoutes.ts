import { Router } from 'express';
import { PersonController } from '../controllers';

const router = Router();
const personController = new PersonController();

/**
 * @swagger
 * /api/persons:
 *   post:
 *     summary: Crear un nuevo contacto
 *     tags: [Persons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - dateOfBirth
 *               - email
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: DD/MM/YYYY
 *               email:
 *                 type: string
 *               phones:
 *                 type: array
 *               addresses:
 *                 type: array
 *     responses:
 *       201:
 *         description: Contacto creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/', personController.createPerson);

/**
 * @swagger
 * /api/persons/search:
 *   get:
 *     summary: Búsqueda dinámica de contactos
 *     description: Buscar contactos usando ?q= para búsqueda general o parámetros específicos
 *     tags: [Persons]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Búsqueda general en nombre, apellido, email y teléfono
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Buscar por email específico (búsqueda parcial)
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: Buscar por nombre (búsqueda parcial)
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: Buscar por apellido (búsqueda parcial)
 *       - in: query
 *         name: dateOfBirth
 *         schema:
 *           type: string
 *           format: DD/MM/YYYY
 *         description: Buscar por fecha de nacimiento (exacta)
 *       - in: query
 *         name: number
 *         schema:
 *           type: string
 *         description: Buscar por número de teléfono (búsqueda parcial)
 *       - in: query
 *         name: typeName
 *         schema:
 *           type: string
 *         description: Buscar por tipo de teléfono (mobile, home, work, fax, other)
 *     responses:
 *       200:
 *         description: Lista de contactos encontrados
 *       400:
 *         description: Error de validación - Al menos un parámetro es requerido
 */
router.get('/search', personController.searchByData);

/**
 * @swagger
 * /api/persons/{id}:
 *   put:
 *     summary: Actualizar datos personales de un contacto
 *     tags: [Persons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Contacto actualizado
 *       404:
 *         description: Contacto no encontrado
 */
router.put('/:id', personController.updatePerson);

/**
 * @swagger
 * /api/persons/{id}:
 *   delete:
 *     summary: Eliminar un contacto
 *     tags: [Persons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Contacto eliminado
 *       404:
 *         description: Contacto no encontrado
 */
router.delete('/:id', personController.deletePerson);

export default router;
