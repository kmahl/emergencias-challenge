import { prisma } from '../config/database';
import { CreateContactActivityDTO, SearchActivityDTO } from '../types';

export class ContactActivityRepository {
  // Crear una actividad
  async create(data: CreateContactActivityDTO) {
    return prisma.contactActivity.create({
      data: {
        personId: data.personId,
        activityType: data.activityType,
        activityDate: data.activityDate,
        description: data.description,
      },
    });
  }

  // Buscar actividades por contacto y tipo de actividad
  async findByPersonAndType(searchData: SearchActivityDTO) {
    const where: any = {
      personId: searchData.personId,
    };

    if (searchData.activityType) {
      where.activityType = searchData.activityType;
    }

    return prisma.contactActivity.findMany({
      where,
      include: {
        person: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            dateOfBirth: true,
          },
        },
      },
      orderBy: {
        activityDate: 'desc',
      },
    });
  }
}
