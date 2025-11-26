import { prisma } from '../config/database';

export class PhoneTypeRepository {
  // Crear tipo de teléfono
  async create(typeName: string) {
    return prisma.phoneType.create({
      data: { typeName },
    });
  }

  // Obtener todos los tipos
  async findAll() {
    return prisma.phoneType.findMany({
      orderBy: { typeName: 'asc' },
    });
  }
}
