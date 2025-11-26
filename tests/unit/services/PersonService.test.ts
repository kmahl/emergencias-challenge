import { PersonService } from '../../../src/services/PersonService';
import { PersonRepository } from '../../../src/repositories/PersonRepository';
import { CreatePersonDTO, UpdatePersonDTO } from '../../../src/types';

// Mock repositories
jest.mock('../../../src/repositories/PersonRepository');

describe('PersonService', () => {
  let service: PersonService;
  let mockPersonRepository: jest.Mocked<PersonRepository>;

  beforeEach(() => {
    service = new PersonService();
    mockPersonRepository = (service as any).personRepository;
    jest.clearAllMocks();
  });

  describe('createPerson', () => {
    it('debe crear una persona exitosamente', async () => {
      const createData: CreatePersonDTO = {
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        dateOfBirth: '15/03/1990',
      };

      const mockPerson = {
        id: 1,
        ...createData,
        phones: [],
        addresses: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPersonRepository.findByEmail = jest.fn().mockResolvedValue(null);
      mockPersonRepository.create = jest.fn().mockResolvedValue(mockPerson);

      const result = await service.createPerson(createData);

      expect(result).toEqual(mockPerson);
      expect(mockPersonRepository.findByEmail).toHaveBeenCalledWith('juan@example.com');
      expect(mockPersonRepository.create).toHaveBeenCalledWith(createData);
    });

    it('debe lanzar error si el email ya existe', async () => {
      const createData: CreatePersonDTO = {
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        dateOfBirth: '15/03/1990',
      };

      mockPersonRepository.findByEmail = jest.fn().mockResolvedValue({ id: 1 });

      await expect(service.createPerson(createData)).rejects.toThrow('Email already exists');
      expect(mockPersonRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('searchPersonsByData', () => {
    it('debe buscar personas por query general', async () => {
      const mockPersons = [
        {
          id: 1,
          firstName: 'Juan',
          lastName: 'Pérez',
          email: 'juan@example.com',
          dateOfBirth: '15/03/1990',
          phones: [],
          addresses: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPersonRepository.findByPersonalData = jest.fn().mockResolvedValue(mockPersons);

      const result = await service.searchPersonsByData({ q: 'Juan' });

      expect(result).toEqual(mockPersons);
      expect(mockPersonRepository.findByPersonalData).toHaveBeenCalledWith({ q: 'Juan' });
    });

    it('debe buscar personas por email específico', async () => {
      const mockPersons = [{ id: 1, email: 'juan@example.com' }];

      mockPersonRepository.findByPersonalData = jest.fn().mockResolvedValue(mockPersons);

      const result = await service.searchPersonsByData({ email: 'juan' });

      expect(result).toEqual(mockPersons);
    });

    it('debe buscar personas por teléfono y tipo', async () => {
      const mockPersons = [{ id: 1, firstName: 'Juan' }];

      mockPersonRepository.findByPersonalData = jest.fn().mockResolvedValue(mockPersons);

      const result = await service.searchPersonsByData({
        phone: '555',
        phoneType: 'mobile',
      });

      expect(result).toEqual(mockPersons);
      expect(mockPersonRepository.findByPersonalData).toHaveBeenCalledWith({
        phone: '555',
        phoneType: 'mobile',
      });
    });
  });

  describe('updatePerson', () => {
    it('debe actualizar una persona exitosamente', async () => {
      const updateData: UpdatePersonDTO = {
        firstName: 'Juan Carlos',
      };

      const existingPerson = {
        id: 1,
        firstName: 'Juan',
        email: 'juan@example.com',
      };

      const updatedPerson = {
        ...existingPerson,
        firstName: 'Juan Carlos',
      };

      mockPersonRepository.findById = jest.fn().mockResolvedValue(existingPerson);
      mockPersonRepository.update = jest.fn().mockResolvedValue(updatedPerson);

      const result = await service.updatePerson(1, updateData);

      expect(result).toEqual(updatedPerson);
      expect(mockPersonRepository.findById).toHaveBeenCalledWith(1);
      expect(mockPersonRepository.update).toHaveBeenCalledWith(1, updateData);
    });

    it('debe lanzar error si la persona no existe', async () => {
      mockPersonRepository.findById = jest.fn().mockResolvedValue(null);

      await expect(service.updatePerson(999, { firstName: 'Test' })).rejects.toThrow(
        'Person not found',
      );
      expect(mockPersonRepository.update).not.toHaveBeenCalled();
    });

    it('debe lanzar error si el nuevo email ya existe', async () => {
      const existingPerson = {
        id: 1,
        email: 'juan@example.com',
      };

      mockPersonRepository.findById = jest.fn().mockResolvedValue(existingPerson);
      mockPersonRepository.existsByEmail = jest.fn().mockResolvedValue(true);

      await expect(
        service.updatePerson(1, { email: 'otro@example.com' }),
      ).rejects.toThrow('Email already exists');
      expect(mockPersonRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('deletePerson', () => {
    it('debe eliminar una persona exitosamente', async () => {
      const existingPerson = { id: 1, firstName: 'Juan' };

      mockPersonRepository.findById = jest.fn().mockResolvedValue(existingPerson);
      mockPersonRepository.delete = jest.fn().mockResolvedValue(existingPerson);

      const result = await service.deletePerson(1);

      expect(result).toEqual(existingPerson);
      expect(mockPersonRepository.findById).toHaveBeenCalledWith(1);
      expect(mockPersonRepository.delete).toHaveBeenCalledWith(1);
    });

    it('debe lanzar error si la persona no existe', async () => {
      mockPersonRepository.findById = jest.fn().mockResolvedValue(null);

      await expect(service.deletePerson(999)).rejects.toThrow('Person not found');
      expect(mockPersonRepository.delete).not.toHaveBeenCalled();
    });
  });
});
