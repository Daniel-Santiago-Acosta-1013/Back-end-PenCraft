export class CreateEmployeeDto {
  name: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  privileges: string;
}

export class UpdateEmployeeDto {
  name?: string;
  age?: number;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  privileges?: string;
}
