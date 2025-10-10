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
      termFormData.sections.condicoesEstagio.sectionData['internshipStartDate']
        .fieldValue;
    const internshipEndDate =
      termFormData.sections.condicoesEstagio.sectionData['internshipEndDate']
        .fieldValue;
    const internshipStartTime =
      termFormData.sections.condicoesEstagio.sectionData['internshipStartTime']
        .fieldValue;
    const internshipEndTime =
      termFormData.sections.condicoesEstagio.sectionData['internshipEndTime']
        .fieldValue;
    const weeklyWorkload =
      termFormData.sections.condicoesEstagio.sectionData['weeklyWorkload']
        .fieldValue;
    const isMandatoryValue =
      termFormData.sections.condicoesEstagio.sectionData['isMandatory']
        .fieldValue;
    const internshipGrant =
      termFormData.sections.condicoesEstagio.sectionData['internshipGrant']
        .fieldValue;
    const transportationAllowance =
      termFormData.sections.condicoesEstagio.sectionData[
        'transportationAllowance'
      ].fieldValue;
    const internshipActivityPlan =
      termFormData.sections.condicoesEstagio.sectionData[
        'internshipActivityPlan'
      ].fieldValue;

    const grantingCompanyName =
      termFormData.sections.concedente.sectionData['grantingCompanyName']
        .fieldValue;
    const grantingCompanyCNPJ =
      termFormData.sections.concedente.sectionData['grantingCompanyCNPJ']
        .fieldValue;
    const grantingCompanyPostalCode =
      termFormData.sections.concedente.sectionData['grantingCompanyPostalCode']
        .fieldValue;
    const grantingCompanyDistrict =
      termFormData.sections.concedente.sectionData['grantingCompanyDistrict']
        .fieldValue;
    const grantingCompanyCity =
      termFormData.sections.concedente.sectionData['grantingCompanyCity']
        .fieldValue;
    const grantingCompanyState =
      termFormData.sections.concedente.sectionData['grantingCompanyState']
        .fieldValue;
    const grantingCompanyAddress =
      termFormData.sections.concedente.sectionData['grantingCompanyAddress']
        .fieldValue;
    const grantingCompanyEmail =
      termFormData.sections.concedente.sectionData['grantingCompanyEmail']
        .fieldValue;
    const grantingCompanyLegalRepresentative =
      termFormData.sections.concedente.sectionData[
        'grantingCompanyLegalRepresentative'
      ].fieldValue;
    const legalRepresentativeRole =
      termFormData.sections.concedente.sectionData['legalRepresentativeRole']
        .fieldValue;
    const supervisor =
      termFormData.sections.concedente.sectionData['supervisor'].fieldValue;
    const supervisorPosition =
      termFormData.sections.concedente.sectionData['supervisorPosition']
        .fieldValue;

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
