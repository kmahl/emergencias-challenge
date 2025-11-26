import { ContactActivityRepository, PersonRepository } from '../repositories';
import { CreateContactActivityDTO, SearchActivityDTO } from '../types';

export class ContactActivityService {
  private activityRepository: ContactActivityRepository;
  private personRepository: PersonRepository;

  constructor() {
    this.activityRepository = new ContactActivityRepository();
    this.personRepository = new PersonRepository();
  }

  // Crear actividad
  async createActivity(data: CreateContactActivityDTO) {
    // Verificar que la persona existe
    const person = await this.personRepository.findById(data.personId);
    if (!person) {
      throw new Error('Person not found');
    }

    return this.activityRepository.create(data);
  }

  // Buscar actividades por persona y tipo
  async searchActivities(searchData: SearchActivityDTO) {
    const activities = await this.activityRepository.findByPersonAndType(searchData);
    
    // Si no hay actividades, verificar si la persona existe para dar error más específico
    if (activities.length === 0) {
      const person = await this.personRepository.findById(searchData.personId);
      if (!person) {
        throw new Error('Person not found');
      }
    }

    return activities;
  }
}
