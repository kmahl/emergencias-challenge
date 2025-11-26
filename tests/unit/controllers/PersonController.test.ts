import { Request, Response, NextFunction } from 'express';
import { PersonController } from '../../../src/controllers/PersonController';
import { PersonService } from '../../../src/services/PersonService';

// Mock service
jest.mock('../../../src/services/PersonService');

describe('PersonController', () => {
  let controller: PersonController;
  let mockPersonService: jest.Mocked<PersonService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    controller = new PersonController();
    mockPersonService = (controller as any).personService;

    mockRequest = {
      body: {},
      params: {},
      query: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();

    jest.clearAllMocks();
  });

  describe('createPerson', () => {
    it('debe crear una persona y retornar 201', async () => {
      const createData = {
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

      mockRequest.body = createData;
      mockPersonService.createPerson = jest.fn().mockResolvedValue(mockPerson);

      await controller.createPerson(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPerson);
    });
  });

  describe('searchByData', () => {
    it('debe buscar personas con ?q= y retornar 200', async () => {
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

      mockRequest.query = { q: 'Juan' };
      mockPersonService.searchPersonsByData = jest.fn().mockResolvedValue(mockPersons);

      await controller.searchByData(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPersons);
    });

    it('debe buscar personas por email específico', async () => {
      const mockPersons = [{ id: 1, email: 'juan@example.com' }];

      mockRequest.query = { email: 'juan' };
      mockPersonService.searchPersonsByData = jest.fn().mockResolvedValue(mockPersons);

      await controller.searchByData(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPersons);
    });

    it('debe buscar personas por teléfono y tipo', async () => {
      const mockPersons = [{ id: 1, firstName: 'Juan' }];

      mockRequest.query = { phone: '555', phoneType: 'mobile' };
      mockPersonService.searchPersonsByData = jest.fn().mockResolvedValue(mockPersons);

      await controller.searchByData(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockPersonService.searchPersonsByData).toHaveBeenCalledWith({
        phone: '555',
        phoneType: 'mobile',
      });
    });
  });

  describe('updatePerson', () => {
    it('debe actualizar una persona y retornar 200', async () => {
      const updateData = { firstName: 'Juan Carlos' };
      const mockUpdated = {
        id: 1,
        firstName: 'Juan Carlos',
        email: 'juan@example.com',
      };

      mockRequest.params = { id: '1' };
      mockRequest.body = updateData;
      mockPersonService.updatePerson = jest.fn().mockResolvedValue(mockUpdated);

      await controller.updatePerson(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUpdated);
    });
  });

  describe('deletePerson', () => {
    it('debe eliminar una persona y retornar 204', async () => {
      mockRequest.params = { id: '1' };
      mockPersonService.deletePerson = jest.fn().mockResolvedValue({});

      mockResponse.send = jest.fn().mockReturnThis();

      await controller.deletePerson(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });
});
