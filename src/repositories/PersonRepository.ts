import { prisma } from '../config/database';
import { CreatePersonDTO, UpdatePersonDTO, SearchPersonByDataDTO } from '../types';

export class PersonRepository {
  // Crear contacto con teléfonos y direcciones
  async create(data: CreatePersonDTO) {
    return prisma.person.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        email: data.email,
        phones: {
          create: data.phones?.map((phone) => ({
            number: phone.number,
            phoneType: {
              connect: { typeName: phone.typeName },
            },
          })) || [],
        },
        addresses: {
          create: data.addresses?.map((address) => ({
            locality: address.locality,
            street: address.street,
            number: address.number,
            notes: address.notes,
          })) || [],
        },
      },
      include: {
        phones: {
          include: {
            phoneType: true,
          },
        },
        addresses: true,
      },
    });
  }

  // Buscar contacto por email
  async findByEmail(email: string) {
    return prisma.person.findUnique({
      where: { email },
      include: {
        phones: {
          include: {
            phoneType: true,
          },
        },
        addresses: true,
      },
    });
  }

  // Buscar contactos por datos personales (firstName, lastName, dateOfBirth, email, phone)
  async findByPersonalData(searchData: SearchPersonByDataDTO) {
    const where: any = {};

    // Búsqueda general con ?q= busca en firstName, lastName, email y número de teléfono
    if (searchData.q) {
      where.OR = [
        { firstName: { contains: searchData.q } },
        { lastName: { contains: searchData.q } },
        { email: { contains: searchData.q } },
        { phones: { some: { number: { contains: searchData.q } } } },
      ];
    } else {
      // Búsquedas específicas
      if (searchData.firstName) {
        where.firstName = { contains: searchData.firstName };
      }
      if (searchData.lastName) {
        where.lastName = { contains: searchData.lastName };
      }
      if (searchData.email) {
        where.email = { contains: searchData.email };
      }
      if (searchData.dateOfBirth) {
        where.dateOfBirth = searchData.dateOfBirth;
      }

      // Búsqueda por número y tipo de teléfono
      if (searchData.phone || searchData.phoneType) {
        where.phones = {
          some: {
            ...(searchData.phone && { number: { contains: searchData.phone } }),
            ...(searchData.phoneType && {
              phoneType: {
                typeName: searchData.phoneType,
              },
            }),
          },
        };
      }
    }

    return prisma.person.findMany({
      where,
      include: {
        phones: {
          include: {
            phoneType: true,
          },
        },
        addresses: true,
      },
    });
  }

  // Buscar por ID
  async findById(id: number) {
    return prisma.person.findUnique({
      where: { id },
      include: {
        phones: {
          include: {
            phoneType: true,
          },
        },
        addresses: true,
      },
    });
  }

  // Actualizar datos personales de un contacto
  async update(id: number, data: UpdatePersonDTO) {
    return prisma.person.update({
      where: { id },
      data,
      include: {
        phones: {
          include: {
            phoneType: true,
          },
        },
        addresses: true,
      },
    });
  }

  // Eliminar un contacto (cascade eliminará phones, addresses y activities)
  async delete(id: number) {
    return prisma.person.delete({
      where: { id },
    });
  }

  // Verificar si existe un email
  async existsByEmail(email: string): Promise<boolean> {
    const count = await prisma.person.count({
      where: { email },
    });
    return count > 0;
  }
}
