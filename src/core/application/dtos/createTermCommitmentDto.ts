export interface CreateTermCommitmentDTO {
  internshipStartDate: Date;

  internshipEndDate: Date;

  internshipStartTime: string;

  internshipEndTime: string;

  weeklyWorkload: number;

  isMandatory: boolean;

  internshipGrant: number;

  transportationAllowance: number;

  internshipActivityPlan: string[];

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

  id_user?: string;
}
