export type FieldValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | string[]
  | null[];

export type SectionData<V = FieldValue, R = (value: V) => string | boolean> = {
  type: string;
  counter?: number | boolean;
  fieldValue: V;
  labelFields?: string;
  label: string;
  rules: Array<R>;
  errorMessages: string[];
  required: boolean;
  readonly?: boolean;
  options?: Array<{ label: string; value: string }>;
  onBlur?: () => void;
};

export type SectionDataMap<
  V = FieldValue,
  R = (value: V) => string | boolean,
> = Record<string, SectionData<V, R>>;

export type FormSectionData<V = Record<string, SectionData>> = {
  sectionTitle: string;
  sectionData: V;
};

export type FormSectionKey = keyof FormTceData;

export type FieldUpdateEvent = {
  sectionIndex: FormSectionKey;
  fieldIndex:
    | keyof StudentSectionData
    | keyof InternshipGrantorSectionData
    | keyof InternshipConditionsSectionData;
  subInputIndex?: number;
  value: FieldValue;
};

export type FormTceData = {
  sections: {
    aluno: FormSectionData<StudentSectionData>;
    concedente: FormSectionData<InternshipGrantorSectionData>;
    condicoesEstagio: FormSectionData<InternshipConditionsSectionData>;
  };
  showSuccessModal: boolean;
  showErrorModal: boolean;
  messageError: string | null;
  loading: boolean;
  filePathId: string | null;
  createdInternshipProcessId: string | null;
};

export type StudentSectionData = {
  name: SectionData;
  academicRegistrationCode: SectionData;
  cpf: SectionData;
  rg: SectionData;
  course: SectionData;
  email: SectionData;
  telephone: SectionData;
};

export type InternshipGrantorSectionData = {
  grantingCompanyName: SectionData;
  grantingCompanyCNPJ: SectionData;
  grantingCompanyPostalCode: SectionData;
  grantingCompanyDistrict: SectionData;
  grantingCompanyCity: SectionData;
  grantingCompanyState: SectionData;
  grantingCompanyAddress: SectionData;
  grantingCompanyEmail: SectionData;
  grantingCompanyLegalRepresentative: SectionData;
  legalRepresentativeRole: SectionData;
  supervisor: SectionData;
  supervisorPosition: SectionData;
};

export type InternshipConditionsSectionData = {
  isMandatory: SectionData;
  internshipStartDate: SectionData;
  internshipEndDate: SectionData;
  internshipStartTime: SectionData;
  internshipEndTime: SectionData;
  weeklyWorkload: SectionData;
  internshipGrant: SectionData;
  transportationAllowance: SectionData;
  internshipActivityPlan: SectionData;
};
