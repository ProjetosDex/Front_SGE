import type { CreateTermCommitmentDTO } from '../dtos/createTermCommitmentDto';

type FieldValue = string | number | boolean | null | undefined | string[];

type SectionData<T = string> = {
  type: string;
  counter?: number | boolean;
  fieldValue: FieldValue;
  labelFields?: string;
  label: string;
  rules: Array<(value: T) => string | boolean>;
  errorMessages: string[];
  required: boolean;
  readonly?: boolean;
  options?: Array<{ label: string; value: string }>;
};

type FormSectionData = {
  sectionTitle: string;
  sectionData: Array<SectionData>;
};

type FormTceData = {
  aluno: FormSectionData;
  concedente: FormSectionData;
  condicoesEstagio: FormSectionData;
};

export class TermCommitmentFormRequestMapper {
  static toRequest(termFormData: FormTceData): CreateTermCommitmentDTO {
    const getValue = (section: string, label: string): any => {
      const sectionData =
        termFormData[section as keyof FormTceData].sectionData;
      const field = sectionData.find((item) => item.label === label);

      if (!field) {
        console.warn(
          `Field with label "${label}" not found in section "${section}". Returning null.`,
        );
        return null;
      }

      return field.fieldValue;
    };

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

    const internshipStartDate = getValue(
      'condicoesEstagio',
      'Início de Estágio',
    ) as string;
    const internshipEndDate = getValue(
      'condicoesEstagio',
      'Término de Estágio',
    ) as string;
    const internshipStartTime = getValue(
      'condicoesEstagio',
      'Horario Inicial',
    ) as string;
    const internshipEndTime = getValue(
      'condicoesEstagio',
      'Horario Final',
    ) as string;
    const weeklyWorkload = getValue(
      'condicoesEstagio',
      'Jornada Semanal',
    ) as number;
    const isMandatoryValue = getValue(
      'condicoesEstagio',
      'Tipo de Estágio',
    ) as string; // Use string, then convert to boolean
    const internshipGrant = getValue(
      'condicoesEstagio',
      'Bolsa Auxílio (R$)',
    ) as number;
    const transportationAllowance = getValue(
      'condicoesEstagio',
      'Auxílio Transporte (R$)',
    ) as number;
    const internshipActivityPlan = getValue(
      'condicoesEstagio',
      'Plano de atividades de Estágio',
    ) as string[];

    const grantingCompanyName = getValue(
      'concedente',
      'Razão Social',
    ) as string;
    const grantingCompanyCNPJ = getValue('concedente', 'CNPJ') as string;
    const grantingCompanyPostalCode = getValue('concedente', 'CEP') as string;
    const grantingCompanyDistrict = getValue('concedente', 'Bairro') as string;
    const grantingCompanyCity = getValue('concedente', 'Cidade') as string;
    const grantingCompanyState = getValue('concedente', 'UF') as string;
    const grantingCompanyAddress = getValue('concedente', 'Endereço') as string;
    const grantingCompanyEmail = getValue('concedente', 'Email') as string;
    const grantingCompanyLegalRepresentative = getValue(
      'concedente',
      'Representante Legal',
    ) as string;
    const legalRepresentativeRole = getValue('concedente', 'Função') as string;
    const supervisor = getValue('concedente', 'Supervisor') as string;
    const supervisorPosition = getValue('concedente', 'Cargo') as string;

    return {
      internshipStartDate: parseDate(internshipStartDate),
      internshipEndDate: parseDate(internshipEndDate),
      internshipStartTime: parseTime(internshipStartTime),
      internshipEndTime: parseTime(internshipEndTime),
      weeklyWorkload: weeklyWorkload,
      isMandatory: isMandatoryValue === '1',
      internshipGrant: internshipGrant,
      transportationAllowance: transportationAllowance,
      internshipActivityPlan: internshipActivityPlan,
      grantingCompanyName: grantingCompanyName,
      grantingCompanyCNPJ: grantingCompanyCNPJ,
      grantingCompanyPostalCode: grantingCompanyPostalCode,
      grantingCompanyDistrict: grantingCompanyDistrict,
      grantingCompanyCity: grantingCompanyCity,
      grantingCompanyState: grantingCompanyState,
      grantingCompanyAddress: grantingCompanyAddress,
      grantingCompanyEmail: grantingCompanyEmail,
      grantingCompanyLegalRepresentative: grantingCompanyLegalRepresentative,
      legalRepresentativeRole: legalRepresentativeRole,
      supervisor: supervisor,
      supervisorPosition: supervisorPosition,
    };
  }
}
