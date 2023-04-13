export class CreateCompanyDto {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
}

export class UpdateCompanyDto {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  email?: string;
}
