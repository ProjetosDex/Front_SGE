import type { FormTceData } from '@/presentation/types/term-commitment-form-types';
import type { CreateTermCommitmentDTO } from '../dtos/createTermCommitmentDto';

export class TermCommitmentFormRequestMapper {
  static toRequest(termFormData: FormTceData): CreateTermCommitmentDTO {
    const parseDate = (dateString: string): Date => {
      return new Date(dateString);
    };

    const parseTime = (timeString: string): Date => {
      const [hours, minutes] = timeString.split(':').map(Number);
      const now = new Date();
      return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes,
        0,
        0,
      );
    };

    const internshipStartDate =
      termFormData.condicoesEstagio.sectionData['internshipStartDate']
        .fieldValue;
    const internshipEndDate =
      termFormData.condicoesEstagio.sectionData['internshipEndDate'].fieldValue;
    const internshipStartTime =
      termFormData.condicoesEstagio.sectionData['internshipStartTime']
        .fieldValue;
    const internshipEndTime =
      termFormData.condicoesEstagio.sectionData['internshipEndTime'].fieldValue;
    const weeklyWorkload =
      termFormData.condicoesEstagio.sectionData['weeklyWorkload'].fieldValue;
    const isMandatoryValue =
      termFormData.condicoesEstagio.sectionData['isMandatory'].fieldValue;
    const internshipGrant =
      termFormData.condicoesEstagio.sectionData['internshipGrant'].fieldValue;
    const transportationAllowance =
      termFormData.condicoesEstagio.sectionData['transportationAllowance']
        .fieldValue;
    const internshipActivityPlan =
      termFormData.condicoesEstagio.sectionData['internshipActivityPlan']
        .fieldValue;

    const grantingCompanyName =
      termFormData.concedente.sectionData['grantingCompanyName'].fieldValue;
    const grantingCompanyCNPJ =
      termFormData.concedente.sectionData['grantingCompanyCNPJ'].fieldValue;
    const grantingCompanyPostalCode =
      termFormData.concedente.sectionData['grantingCompanyPostalCode']
        .fieldValue;
    const grantingCompanyDistrict =
      termFormData.concedente.sectionData['grantingCompanyDistrict'].fieldValue;
    const grantingCompanyCity =
      termFormData.concedente.sectionData['grantingCompanyCity'].fieldValue;
    const grantingCompanyState =
      termFormData.concedente.sectionData['grantingCompanyState'].fieldValue;
    const grantingCompanyAddress =
      termFormData.concedente.sectionData['grantingCompanyAddress'].fieldValue;
    const grantingCompanyEmail =
      termFormData.concedente.sectionData['grantingCompanyEmail'].fieldValue;
    const grantingCompanyLegalRepresentative =
      termFormData.concedente.sectionData['grantingCompanyLegalRepresentative']
        .fieldValue;
    const legalRepresentativeRole =
      termFormData.concedente.sectionData['legalRepresentativeRole'].fieldValue;
    const supervisor =
      termFormData.concedente.sectionData['supervisor'].fieldValue;
    const supervisorPosition =
      termFormData.concedente.sectionData['supervisorPosition'].fieldValue;

    return {
      internshipStartDate: parseDate(internshipStartDate as string),
      internshipEndDate: parseDate(internshipEndDate as string),
      internshipStartTime: internshipStartTime as string,
      internshipEndTime: internshipEndTime as string,
      weeklyWorkload: Number(weeklyWorkload),
      isMandatory: isMandatoryValue === '1',
      internshipGrant: Number(internshipGrant),
      transportationAllowance: Number(transportationAllowance),
      internshipActivityPlan: internshipActivityPlan as string[],
      grantingCompanyName: grantingCompanyName as string,
      grantingCompanyCNPJ: grantingCompanyCNPJ as string,
      grantingCompanyPostalCode: grantingCompanyPostalCode as string,
      grantingCompanyDistrict: grantingCompanyDistrict as string,
      grantingCompanyCity: grantingCompanyCity as string,
      grantingCompanyState: grantingCompanyState as string,
      grantingCompanyAddress: grantingCompanyAddress as string,
      grantingCompanyEmail: grantingCompanyEmail as string,
      grantingCompanyLegalRepresentative:
        grantingCompanyLegalRepresentative as string,
      legalRepresentativeRole: legalRepresentativeRole as string,
      supervisor: supervisor as string,
      supervisorPosition: supervisorPosition as string,
    };
  }
}
