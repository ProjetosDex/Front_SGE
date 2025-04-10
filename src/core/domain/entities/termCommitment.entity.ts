import type { User } from './user.entity';

export interface TermCommitment {
  id: string;
  insurancePolicyNumber: string;
  insuranceCompanyName: string;
  advisorProfessor: string;
  siapeCode: string;
  internshipStartDate: Date;
  internshipEndDate: Date;
  internshipStartTime: Date;
  internshipEndTime: Date;
  weeklyWorkload: number;
  isMandatory: boolean;
  internshipGrant: number;
  transportationAllowance: number;
  internshipActivityPlan: string;
  grantingCompanyName: string;
  grantingCompanyCNPJ: string;
  grantingCompanyPostalCode: string;
  grantingCompanyDistrict: string;
  grantingCompanyCity: string;
  grantingCompanyState: string;
  grantingCompanyAddress: string;
  grantingCompanyEmail: string;
  grantingCompanyLegalRepresentative: string;
  legalRepresentativeRole: string;
  supervisor: string;
  supervisorPosition: string;
  filePath: string;
  id_user: string;
  user?: User;
}
