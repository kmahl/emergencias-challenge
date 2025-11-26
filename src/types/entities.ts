// ==================== Base Types ====================

export interface PersonData {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PhoneData {
  id: number;
  number: string;
  personId: number;
  phoneTypeId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddressData {
  id: number;
  personId: number;
  locality: string;
  street: string;
  number: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactActivityData {
  id: number;
  personId: number;
  activityType: 'call' | 'meeting' | 'email';
  activityDate: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PhoneTypeData {
  id: number;
  typeName: string;
  createdAt: Date;
  updatedAt: Date;
}
