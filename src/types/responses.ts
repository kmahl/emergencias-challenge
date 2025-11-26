import { PersonData, PhoneData, AddressData } from './entities';

// ==================== Response Types ====================

export interface PersonWithRelations extends PersonData {
  phones: PhoneData[];
  addresses: AddressData[];
}

export interface ActivityWithPersonDetails {
  id: number;
  activityType: 'call' | 'meeting' | 'email';
  activityDate: string;
  description?: string;
  person: {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
  };
}
