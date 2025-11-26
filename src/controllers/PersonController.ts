import { Request, Response } from 'express';
import { PersonService } from '../services';
import { asyncHandler } from '../middlewares/asyncHandler';
import {
  createPersonSchema,
  updatePersonSchema,
  searchPersonSchema,
  idParamSchema,
} from '../validators';

export class PersonController {
  private personService: PersonService;

  constructor() {
    this.personService = new PersonService();
  }

  // POST /api/persons - Crear contacto
  createPerson = asyncHandler(async (req: Request, res: Response) => {
    const validated = createPersonSchema.parse(req.body);
    const person = await this.personService.createPerson(validated);
    res.status(201).json(person);
  });

  // GET /api/persons/search - Búsqueda dinámica: ?q= para general o parámetros específicos
  searchByData = asyncHandler(async (req: Request, res: Response) => {
    const validated = searchPersonSchema.parse(req.query);
    const persons = await this.personService.searchPersonsByData(validated);
    res.status(200).json(persons);
  });

  // PUT /api/persons/:id - Actualizar datos personales
  updatePerson = asyncHandler(async (req: Request, res: Response) => {
    const { id } = idParamSchema.parse(req.params);
    const validated = updatePersonSchema.parse(req.body);
    const person = await this.personService.updatePerson(Number(id), validated);
    res.status(200).json(person);
  });

  // DELETE /api/persons/:id - Eliminar contacto
  deletePerson = asyncHandler(async (req: Request, res: Response) => {
    const { id } = idParamSchema.parse(req.params);
    await this.personService.deletePerson(Number(id));
    res.status(204).send();
  });
}
