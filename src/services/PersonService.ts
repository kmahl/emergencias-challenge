import { PersonRepository } from '../repositories';
import { CreatePersonDTO, UpdatePersonDTO, SearchPersonByDataDTO } from '../types';

export class PersonService {
  private personRepository: PersonRepository;

  constructor() {
    this.personRepository = new PersonRepository();
  }

  // Crear contacto
  async createPerson(data: CreatePersonDTO) {
    // Validar que el email no exista
    const existingPerson = await this.personRepository.findByEmail(data.email);
    if (existingPerson) {
      throw new Error('Email already exists');
    }

    return this.personRepository.create(data);
  }

  // Buscar por datos personales (búsqueda dinámica)
  async searchPersonsByData(searchData: SearchPersonByDataDTO) {
    // La validación de que al menos un parámetro esté presente se hace en el validator con Zod
    return this.personRepository.findByPersonalData(searchData);
  }

  // Actualizar datos personales
  async updatePerson(id: number, data: UpdatePersonDTO) {
    // Verificar que la persona existe
    const existingPerson = await this.personRepository.findById(id);
    if (!existingPerson) {
      throw new Error('Person not found');
    }

    // Si se actualiza el email, verificar que no exista
    if (data.email && data.email !== existingPerson.email) {
      const emailExists = await this.personRepository.existsByEmail(data.email);
      if (emailExists) {
        throw new Error('Email already exists');
      }
    }

    return this.personRepository.update(id, data);
  }

  // Eliminar contacto
  async deletePerson(id: number) {
    // Verificar que la persona existe
    const existingPerson = await this.personRepository.findById(id);
    if (!existingPerson) {
      throw new Error('Person not found');
    }

    return this.personRepository.delete(id);
  }
}
