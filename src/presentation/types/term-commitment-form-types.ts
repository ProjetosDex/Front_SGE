export type FieldValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | string[];

export type SectionData<T = string> = {
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

export type FormSectionData = {
  sectionTitle: string;
  sectionData: Array<SectionData>;
};

export type FormTceData = {
  aluno: FormSectionData;
  concedente: FormSectionData;
  condicoesEstagio: FormSectionData;
};

export type FormSectionKey = keyof FormTceData;

export type FieldUpdateEvent = {
  index: number;
  subInputIndex?: number;
  value: FieldValue;
};
