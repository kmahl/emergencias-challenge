// ==================== DTOs para Creación ====================

export interface CreatePersonDTO {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phones?: CreatePhoneDTO[];
  addresses?: CreateAddressDTO[];
}

export interface CreatePhoneDTO {
  number: string;
  typeName: string; // 'mobile', 'home', 'work', etc.
}

export interface CreateAddressDTO {
  locality: string;
  street: string;
  number: string;
  notes?: string;
}

export interface CreateContactActivityDTO {
  personId: number;
  activityType: 'call' | 'meeting' | 'email';
  activityDate: string;
  description?: string;
}

// ==================== DTOs para Actualización ====================

export type UpdatePersonDTO = Partial<Omit<CreatePersonDTO, 'phones' | 'addresses'>>;

// ==================== DTOs para Búsqueda ====================

export interface SearchPersonByDataDTO {
  q?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  phone?: string;
  phoneType?: string;
}

export interface SearchPhoneDTO {
  number: string;
  typeName: string;
}

export interface SearchActivityDTO {
  personId: number;
  activityType?: 'call' | 'meeting' | 'email';
}
