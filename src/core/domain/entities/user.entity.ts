export enum UserRole {
  STUDENT = 'STUDENT',
  EMPLOYEE = 'EMPLOYEE',
  ADMINISTRATOR = 'ADMINISTRATOR',
}

export interface User {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  academicRegistrationCode: string;
  email: string;
  telephone: string;
  courseStudy: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  id_institution: string | null;
}
