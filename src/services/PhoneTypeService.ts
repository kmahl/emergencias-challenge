import { PhoneTypeRepository } from '../repositories';

export class PhoneTypeService {
  private phoneTypeRepository: PhoneTypeRepository;

  constructor() {
    this.phoneTypeRepository = new PhoneTypeRepository();
  }

  // Listar todos los tipos
  async getAllPhoneTypes() {
    return this.phoneTypeRepository.findAll();
  }

  // Crear tipo de teléfono
  async createPhoneType(typeName: string) {
    return this.phoneTypeRepository.create(typeName);
  }
}
