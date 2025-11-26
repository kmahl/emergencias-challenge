import { PersonRepository } from '../../../src/repositories/PersonRepository';
import { prisma } from '../../../src/config/database';
import { CreatePersonDTO } from '../../../src/types';

// Mock Prisma client
jest.mock('../../../src/config/database', () => ({
  prisma: {
    person: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  },
}));

describe('PersonRepository', () => {
  let repository: PersonRepository;

  beforeEach(() => {
    repository = new PersonRepository();
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debe crear una persona con teléfonos y direcciones', async () => {
      const createData: CreatePersonDTO = {
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        dateOfBirth: '15/03/1990',
        phones: [
          { number: '555-1234', typeName: 'mobile' },
        ],
        addresses: [
          { locality: 'Madrid', street: 'Calle Principal', number: '123' },
        ],
      };

      const mockPerson = {
        id: 1,
        ...createData,
        phones: [{ id: 1, number: '555-1234', phoneTypeId: 1 }],
        addresses: [{ id: 1, locality: 'Madrid', street: 'Calle Principal', number: '123' }],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.person.create as jest.Mock).mockResolvedValue(mockPerson);

      const result = await repository.create(createData);

      expect(result).toEqual(mockPerson);
      expect(prisma.person.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          firstName: 'Juan',
          lastName: 'Pérez',
          email: 'juan@example.com',
        }),
        include: expect.any(Object),
      });
    });
  });

  describe('findByEmail', () => {
    it('debe encontrar una persona por email', async () => {
      const mockPerson = {
        id: 1,
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        dateOfBirth: '15/03/1990',
        phones: [],
        addresses: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.person.findUnique as jest.Mock).mockResolvedValue(mockPerson);

      const result = await repository.findByEmail('juan@example.com');

      expect(result).toEqual(mockPerson);
      expect(prisma.person.findUnique).toHaveBeenCalledWith({
        where: { email: 'juan@example.com' },
        include: expect.any(Object),
      });
    });

    it('debe retornar null si no encuentra la persona', async () => {
      (prisma.person.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findByEmail('noexiste@example.com');

      expect(result).toBeNull();
    });
  });

  describe('findByPersonalData', () => {
    it('debe buscar personas por búsqueda general (?q=)', async () => {
      const mockPersons = [
        {
          id: 1,
          firstName: 'Juan',
          lastName: 'Pérez',
          email: 'juan@example.com',
          dateOfBirth: '15/03/1990',
          phones: [],
          addresses: [],
        },
      ];

      (prisma.person.findMany as jest.Mock).mockResolvedValue(mockPersons);

      const result = await repository.findByPersonalData({ q: 'Juan' });

      expect(result).toEqual(mockPersons);
      expect(prisma.person.findMany).toHaveBeenCalledWith({
        where: {
          OR: expect.arrayContaining([
            { firstName: { contains: 'Juan' } },
            { lastName: { contains: 'Juan' } },
            { email: { contains: 'Juan' } },
          ]),
        },
        include: expect.any(Object),
      });
    });

    it('debe buscar personas por email específico', async () => {
      const mockPersons = [
        {
          id: 1,
          firstName: 'Juan',
          email: 'juan@example.com',
        },
      ];

      (prisma.person.findMany as jest.Mock).mockResolvedValue(mockPersons);

      const result = await repository.findByPersonalData({ email: 'juan' });

      expect(result).toEqual(mockPersons);
      expect(prisma.person.findMany).toHaveBeenCalledWith({
        where: { email: { contains: 'juan' } },
        include: expect.any(Object),
      });
    });

    it('debe buscar personas por teléfono y tipo', async () => {
      const mockPersons = [
        {
          id: 1,
          firstName: 'Juan',
          phones: [{ number: '555-1234', phoneType: { typeName: 'mobile' } }],
        },
      ];

      (prisma.person.findMany as jest.Mock).mockResolvedValue(mockPersons);

      const result = await repository.findByPersonalData({
        phone: '555',
        phoneType: 'mobile',
      });

      expect(result).toEqual(mockPersons);
      expect(prisma.person.findMany).toHaveBeenCalledWith({
        where: {
          phones: {
            some: {
              number: { contains: '555' },
              phoneType: { typeName: 'mobile' },
            },
          },
        },
        include: expect.any(Object),
      });
    });
  });

  describe('update', () => {
    it('debe actualizar una persona', async () => {
      const mockUpdated = {
        id: 1,
        firstName: 'Juan Carlos',
        email: 'juancarlos@example.com',
      };

      (prisma.person.update as jest.Mock).mockResolvedValue(mockUpdated);

      const result = await repository.update(1, {
        firstName: 'Juan Carlos',
        email: 'juancarlos@example.com',
      });

      expect(result).toEqual(mockUpdated);
      expect(prisma.person.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          firstName: 'Juan Carlos',
          email: 'juancarlos@example.com',
        },
        include: expect.any(Object),
      });
    });
  });

  describe('delete', () => {
    it('debe eliminar una persona', async () => {
      const mockDeleted = { id: 1, firstName: 'Juan' };

      (prisma.person.delete as jest.Mock).mockResolvedValue(mockDeleted);

      const result = await repository.delete(1);

      expect(result).toEqual(mockDeleted);
      expect(prisma.person.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('existsByEmail', () => {
    it('debe retornar true si existe el email', async () => {
      (prisma.person.count as jest.Mock).mockResolvedValue(1);

      const result = await repository.existsByEmail('juan@example.com');

      expect(result).toBe(true);
    });

    it('debe retornar false si no existe el email', async () => {
      (prisma.person.count as jest.Mock).mockResolvedValue(0);

      const result = await repository.existsByEmail('noexiste@example.com');

      expect(result).toBe(false);
    });
  });
});
