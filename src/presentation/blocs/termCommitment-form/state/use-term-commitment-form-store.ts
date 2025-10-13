import type { AddressCepResponseDto } from '@/core/application/dtos/address-cep-response-dto';
import type { InternshipProcess } from '@/core/domain/entities/internshipProcess.entity';
import type { User } from '@/core/domain/entities/user.entity';
import type {
  FieldUpdateEvent,
  FieldValue,
  FormTceData,
} from '@/presentation/types/term-commitment-form-types';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useTermCommitmentFormStore = defineStore(
  'TermCommitmentFormStore',
  () => {
    const state: FormTceData = reactive(getInitialState());

    const setFormLoading = (loading: boolean) => {
      state.loading = loading;
    };

    const getGrantingCompanyPostalCode = () => {
      const cep =
        state.sections.concedente.sectionData['grantingCompanyPostalCode']
          .fieldValue;
      return cep;
    };

    const setUserSectionData = (userData: User) => {
      state.sections.aluno.sectionData['name'].fieldValue = userData.name;
      state.sections.aluno.sectionData['academicRegistrationCode'].fieldValue =
        userData.academicRegistrationCode;
      state.sections.aluno.sectionData['cpf'].fieldValue = userData.cpf;
      state.sections.aluno.sectionData['rg'].fieldValue = userData.rg;
      state.sections.aluno.sectionData['course'].fieldValue =
        userData.courseStudy;
      state.sections.aluno.sectionData['email'].fieldValue = userData.email;
      state.sections.aluno.sectionData['telephone'].fieldValue =
        userData.telephone;
    };

    const setOnblurEventInPostalCodeField = (
      fillFormAddressFieldsByCep: () => void,
    ) => {
      state.sections.concedente.sectionData[
        'grantingCompanyPostalCode'
      ].onBlur = fillFormAddressFieldsByCep;
    };

    const setShowSuccessModal = (showModal: boolean) => {
      state.showSuccessModal = showModal;
    };

    const setShowErrorModal = (showModal: boolean) => {
      state.showErrorModal = showModal;
    };

    const setMessageError = (message: string) => {
      state.messageError = message;
    };

    const setTermFilePathId = (termFilePathId: string) => {
      state.filePathId = termFilePathId;
    };

    const setInternshipProcessId = (internshipProcessId: string) => {
      state.createdInternshipProcessId = internshipProcessId;
    };

    const updateSectionDataBySectionIndex = (fieldEvent: FieldUpdateEvent) => {
      const section =
        state.sections[
          fieldEvent.sectionIndex as keyof FormTceData['sections']
        ];
      if (!section) {
        console.warn('Seção não encontrada:', fieldEvent.sectionIndex);
        return;
      }

      const sectionData = section.sectionData;

      if (
        fieldEvent.fieldIndex &&
        sectionData &&
        sectionData[fieldEvent.fieldIndex as keyof typeof sectionData]
      ) {
        (
          sectionData[fieldEvent.fieldIndex as keyof typeof sectionData] as {
            fieldValue: FieldValue;
          }
        ).fieldValue = fieldEvent.value;
      } else {
        console.warn(
          'Campo não encontrado na seção',
          fieldEvent.fieldIndex,
          section.sectionData,
        );
      }
    };

    const fillFormAddressFields = (addressData: AddressCepResponseDto) => {
      state.sections.concedente.sectionData[
        'grantingCompanyDistrict'
      ].fieldValue = addressData.bairro;

      state.sections.concedente.sectionData['grantingCompanyCity'].fieldValue =
        addressData.localidade;

      state.sections.concedente.sectionData['grantingCompanyState'].fieldValue =
        addressData.uf;

      state.sections.concedente.sectionData[
        'grantingCompanyAddress'
      ].fieldValue = `${addressData.complemento} ${addressData.logradouro}`;
    };

    const formatActivityPlans = (activityPlansString: string) => {
      return JSON.parse(activityPlansString);
    };

    const fillTermCommitmentData = (internshipProcess: InternshipProcess) => {
      state.sections.concedente.sectionData['grantingCompanyName'].fieldValue =
        internshipProcess.termCommitment.grantingCompanyName;
      state.sections.concedente.sectionData['grantingCompanyCNPJ'].fieldValue =
        internshipProcess.termCommitment.grantingCompanyCNPJ;
      state.sections.concedente.sectionData[
        'grantingCompanyPostalCode'
      ].fieldValue = internshipProcess.termCommitment.grantingCompanyPostalCode;
      state.sections.concedente.sectionData[
        'grantingCompanyDistrict'
      ].fieldValue = internshipProcess.termCommitment.grantingCompanyDistrict;
      state.sections.concedente.sectionData['grantingCompanyCity'].fieldValue =
        internshipProcess.termCommitment.grantingCompanyCity;
      state.sections.concedente.sectionData['grantingCompanyState'].fieldValue =
        internshipProcess.termCommitment.grantingCompanyState;
      state.sections.concedente.sectionData[
        'grantingCompanyAddress'
      ].fieldValue = internshipProcess.termCommitment.grantingCompanyAddress;
      state.sections.concedente.sectionData['grantingCompanyEmail'].fieldValue =
        internshipProcess.termCommitment.grantingCompanyEmail;
      state.sections.concedente.sectionData[
        'grantingCompanyLegalRepresentative'
      ].fieldValue =
        internshipProcess.termCommitment.grantingCompanyLegalRepresentative;
      state.sections.concedente.sectionData[
        'legalRepresentativeRole'
      ].fieldValue = internshipProcess.termCommitment.legalRepresentativeRole;
      state.sections.concedente.sectionData['supervisor'].fieldValue =
        internshipProcess.termCommitment.supervisor;
      state.sections.concedente.sectionData['supervisorPosition'].fieldValue =
        internshipProcess.termCommitment.supervisorPosition;
      state.sections.condicoesEstagio.sectionData['isMandatory'].fieldValue =
        internshipProcess.termCommitment.isMandatory ? '1' : '2';
      state.sections.condicoesEstagio.sectionData[
        'internshipStartDate'
      ].fieldValue =
        internshipProcess.termCommitment.internshipStartDate.split('T')[0];
      state.sections.condicoesEstagio.sectionData[
        'internshipEndDate'
      ].fieldValue =
        internshipProcess.termCommitment.internshipEndDate.split('T')[0];
      state.sections.condicoesEstagio.sectionData[
        'internshipStartTime'
      ].fieldValue = internshipProcess.termCommitment.internshipStartTime
        .split('T')[1]
        .substring(0, 5);
      state.sections.condicoesEstagio.sectionData[
        'internshipEndTime'
      ].fieldValue = internshipProcess.termCommitment.internshipEndTime
        .split('T')[1]
        .substring(0, 5);
      state.sections.condicoesEstagio.sectionData['weeklyWorkload'].fieldValue =
        internshipProcess.termCommitment.weeklyWorkload;
      state.sections.condicoesEstagio.sectionData[
        'internshipGrant'
      ].fieldValue = internshipProcess.termCommitment.internshipGrant;
      state.sections.condicoesEstagio.sectionData[
        'transportationAllowance'
      ].fieldValue = internshipProcess.termCommitment.transportationAllowance;
      state.sections.condicoesEstagio.sectionData[
        'internshipActivityPlan'
      ].fieldValue = formatActivityPlans(
        internshipProcess.termCommitment.internshipActivityPlan,
      );
    };

    const fillFormMock = () => {
      state.sections.concedente.sectionData['grantingCompanyName'].fieldValue =
        'AGU';
      state.sections.concedente.sectionData['grantingCompanyCNPJ'].fieldValue =
        '49892589000179';
      state.sections.concedente.sectionData[
        'grantingCompanyPostalCode'
      ].fieldValue = '67145855';
      state.sections.concedente.sectionData[
        'grantingCompanyDistrict'
      ].fieldValue = 'Paar';
      state.sections.concedente.sectionData['grantingCompanyCity'].fieldValue =
        'Ananindeua';
      state.sections.concedente.sectionData['grantingCompanyState'].fieldValue =
        'PA';
      state.sections.concedente.sectionData[
        'grantingCompanyAddress'
      ].fieldValue = 'tv.esquina';
      state.sections.concedente.sectionData['grantingCompanyEmail'].fieldValue =
        'rafa.teste@email.com';
      state.sections.concedente.sectionData[
        'grantingCompanyLegalRepresentative'
      ].fieldValue = 'Afonso';
      state.sections.concedente.sectionData[
        'legalRepresentativeRole'
      ].fieldValue = 'Product Owner';
      state.sections.concedente.sectionData['supervisor'].fieldValue = 'Afonso';
      state.sections.concedente.sectionData['supervisorPosition'].fieldValue =
        'Product Owner';
      //condicoes estagio
      state.sections.condicoesEstagio.sectionData['isMandatory'].fieldValue =
        '1';
      state.sections.condicoesEstagio.sectionData[
        'internshipStartDate'
      ].fieldValue = '2025-04-18';
      state.sections.condicoesEstagio.sectionData[
        'internshipEndDate'
      ].fieldValue = '2025-04-18';
      state.sections.condicoesEstagio.sectionData[
        'internshipStartTime'
      ].fieldValue = '08:00';
      state.sections.condicoesEstagio.sectionData[
        'internshipEndTime'
      ].fieldValue = '12:00';
      state.sections.condicoesEstagio.sectionData['weeklyWorkload'].fieldValue =
        '20';
      state.sections.condicoesEstagio.sectionData[
        'internshipGrant'
      ].fieldValue = '800';
      state.sections.condicoesEstagio.sectionData[
        'transportationAllowance'
      ].fieldValue = '100';
      state.sections.condicoesEstagio.sectionData[
        'internshipActivityPlan'
      ].fieldValue = [
        'atividade 1',
        'atividade 2',
        'atividade 3',
        'atividade 4',
        'atividade 5',
      ];
    };

    const clearFormFields = (): Partial<FormTceData> => {
      return {
        ...state,
        sections: {
          ...state.sections,
          concedente: {
            sectionTitle: 'Concedente',
            sectionData: {
              grantingCompanyName: {
                type: 'text',
                counter: 255,
                fieldValue: null,
                label: 'Razão Social',
                rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
                errorMessages: [],
                required: true,
              },
              grantingCompanyCNPJ: {
                type: 'text',
                counter: 255,
                fieldValue: null,
                label: 'CNPJ',
                rules: [(v: FieldValue) => validateCnpj(v as string)],
                errorMessages: [],
                required: true,
              },
              grantingCompanyPostalCode: {
                type: 'text',
                counter: 255,
                fieldValue: null,
                label: 'CEP',
                rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
                errorMessages: [],
                required: true,
              },
              grantingCompanyDistrict: {
                type: 'text',
                counter: 255,
                fieldValue: null,
                label: 'Bairro',
                rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
                errorMessages: [],
                required: true,
              },
              grantingCompanyCity: {
                type: 'text',
                counter: 255,
                fieldValue: null,
                label: 'Cidade',
                rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
                errorMessages: [],
                required: true,
              },
              grantingCompanyState: {
                type: 'text',
                counter: 255,
                fieldValue: null,
                label: 'UF',
                rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
                errorMessages: [],
                required: true,
              },
              grantingCompanyAddress: {
                type: 'text',
                counter: 255,
                fieldValue: null,
                label: 'Endereço',
                rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
                errorMessages: [],
                required: true,
              },
              grantingCompanyEmail: {
                type: 'text',
                counter: 255,
                fieldValue: null,
                label: 'Email',
                rules: [
                  (v: FieldValue) => !!v || 'Este campo é obrigatório',
                  (v: FieldValue) =>
                    /.+@.+\..+/.test(v as string) || 'E-mail inválido',
                ],
                errorMessages: [],
                required: true,
              },
              grantingCompanyLegalRepresentative: {
                type: 'text',
                counter: 255,
                fieldValue: null,
                label: 'Representante Legal',
                rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
                errorMessages: [],
                required: true,
              },
              legalRepresentativeRole: {
                type: 'text',
                counter: 255,
                fieldValue: null,
                label: 'Função',
                rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
                errorMessages: [],
                required: true,
              },
              supervisor: {
                type: 'text',
                counter: 255,
                fieldValue: null,
                label: 'Supervisor',
                rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
                errorMessages: [],
                required: true,
              },
              supervisorPosition: {
                type: 'text',
                counter: 255,
                fieldValue: null,
                label: 'Cargo',
                rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
                errorMessages: [],
                required: true,
              },
            },
          },
          condicoesEstagio: {
            sectionTitle: 'Condições do Estágio',
            sectionData: {
              isMandatory: {
                type: 'radio-group',
                fieldValue: '1',
                label: 'Tipo de Estágio',
                rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
                errorMessages: [],
                required: true,
                options: [
                  { label: 'Obrigatório', value: '1' },
                  { label: 'Não-Obrigatório', value: '2' },
                ],
              },
              internshipStartDate: {
                type: 'date',
                fieldValue: null,
                label: 'Início de Estágio',
                rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
                errorMessages: [],
                required: true,
              },
              internshipEndDate: {
                type: 'date',
                fieldValue: null,
                label: 'Término de Estágio',
                rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
                errorMessages: [],
                required: true,
              },
              internshipStartTime: {
                type: 'time',
                fieldValue: null,
                label: 'Horario Inicial',
                rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
                errorMessages: [],
                required: true,
              },
              internshipEndTime: {
                type: 'time',
                fieldValue: null,
                label: 'Horario Final',
                rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
                errorMessages: [],
                required: true,
              },
              weeklyWorkload: {
                type: 'number',
                fieldValue: null,
                label: 'Jornada Semanal',
                rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
                errorMessages: [],
                required: true,
              },
              internshipGrant: {
                type: 'number',
                fieldValue: null,
                label: 'Bolsa Auxílio (R$)',
                rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
                errorMessages: [],
                required: true,
              },
              transportationAllowance: {
                type: 'number',
                fieldValue: null,
                label: 'Auxílio Transporte (R$)',
                rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
                errorMessages: [],
                required: true,
              },
              internshipActivityPlan: {
                type: 'multi-text-field',
                fieldValue: [null, null, null, null, null],
                labelFields: 'Atividade',
                label: 'Plano de atividades de Estágio',
                rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
                errorMessages: [],
                required: true,
              },
            },
          },
        },
      };
    };

    const clear = () => {
      Object.assign(state, clearFormFields());
    };

    return {
      state,
      clear,
      setFormLoading,
      setUserSectionData,
      setShowSuccessModal,
      setShowErrorModal,
      setOnblurEventInPostalCodeField,
      setTermFilePathId,
      setInternshipProcessId,
      setMessageError,
      getGrantingCompanyPostalCode,
      updateSectionDataBySectionIndex,
      fillFormAddressFields,
      fillTermCommitmentData,
      fillFormMock,
    };
  },
);

export const formTermCommitmentInitialState: FormTceData = {
  sections: {
    aluno: {
      sectionTitle: 'Aluno',
      sectionData: {
        name: {
          type: 'text',
          counter: 255,
          fieldValue: '',
          label: 'nome',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
          readonly: true,
        },
        academicRegistrationCode: {
          type: 'text',
          counter: 255,
          fieldValue: '',
          label: 'matricula',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
          readonly: true,
        },
        cpf: {
          type: 'text',
          counter: 255,
          fieldValue: '',
          label: 'cpf',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
          readonly: true,
        },
        rg: {
          type: 'text',
          counter: 255,
          fieldValue: '',
          label: 'RG',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
          readonly: true,
        },
        course: {
          type: 'text',
          counter: 255,
          fieldValue: '',
          label: 'curso',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
          readonly: true,
        },
        email: {
          type: 'text',
          counter: 255,
          fieldValue: '',
          label: 'email',
          rules: [
            (v: FieldValue) => !!v || 'Este campo é obrigatório',
            (v: FieldValue) =>
              /.+@.+\..+/.test(v as string) || 'E-mail inválido',
          ],
          errorMessages: [],
          required: true,
          readonly: true,
        },
        telephone: {
          type: 'text',
          counter: 255,
          fieldValue: '',
          label: 'celular',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
          readonly: true,
        },
      },
    },
    concedente: {
      sectionTitle: 'Concedente',
      sectionData: {
        grantingCompanyName: {
          type: 'text',
          counter: 255,
          fieldValue: '',
          label: 'Razão Social',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
        },
        grantingCompanyCNPJ: {
          type: 'text',
          counter: 255,
          fieldValue: '',
          label: 'CNPJ',
          rules: [(v: FieldValue) => validateCnpj(v as string)],
          errorMessages: [],
          required: true,
        },
        grantingCompanyPostalCode: {
          type: 'text',
          counter: 255,
          fieldValue: '',
          label: 'CEP',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
        },
        grantingCompanyDistrict: {
          type: 'text',
          counter: 255,
          fieldValue: '',
          label: 'Bairro',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
        },
        grantingCompanyCity: {
          type: 'text',
          counter: 255,
          fieldValue: '',
          label: 'Cidade',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
        },
        grantingCompanyState: {
          type: 'text',
          counter: 255,
          fieldValue: '',
          label: 'UF',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
        },
        grantingCompanyAddress: {
          type: 'text',
          counter: 255,
          fieldValue: '',
          label: 'Endereço',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
        },
        grantingCompanyEmail: {
          type: 'text',
          counter: 255,
          fieldValue: '',
          label: 'Email',
          rules: [
            (v: FieldValue) => !!v || 'Este campo é obrigatório',
            (v: FieldValue) =>
              /.+@.+\..+/.test(v as string) || 'E-mail inválido',
          ],
          errorMessages: [],
          required: true,
        },
        grantingCompanyLegalRepresentative: {
          type: 'text',
          counter: 255,
          fieldValue: '',
          label: 'Representante Legal',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
        },
        legalRepresentativeRole: {
          type: 'text',
          counter: 255,
          fieldValue: '',
          label: 'Função',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
        },
        supervisor: {
          type: 'text',
          counter: 255,
          fieldValue: '',
          label: 'Supervisor',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
        },
        supervisorPosition: {
          type: 'text',
          counter: 255,
          fieldValue: '',
          label: 'Cargo',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
        },
      },
    },
    condicoesEstagio: {
      sectionTitle: 'Condições do Estágio',
      sectionData: {
        isMandatory: {
          type: 'radio-group',
          fieldValue: '1',
          label: 'Tipo de Estágio',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
          options: [
            { label: 'Obrigatório', value: '1' },
            { label: 'Não-Obrigatório', value: '2' },
          ],
        },
        internshipStartDate: {
          type: 'date',
          fieldValue: '',
          label: 'Início de Estágio',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
        },
        internshipEndDate: {
          type: 'date',
          fieldValue: '',
          label: 'Término de Estágio',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
        },
        internshipStartTime: {
          type: 'time',
          fieldValue: '',
          label: 'Horario Inicial',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
        },
        internshipEndTime: {
          type: 'time',
          fieldValue: '',
          label: 'Horario Final',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
        },
        weeklyWorkload: {
          type: 'number',
          fieldValue: '',
          label: 'Jornada Semanal',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
        },
        internshipGrant: {
          type: 'number',
          fieldValue: '',
          label: 'Bolsa Auxílio (R$)',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
        },
        transportationAllowance: {
          type: 'number',
          fieldValue: '',
          label: 'Auxílio Transporte (R$)',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
        },
        internshipActivityPlan: {
          type: 'multi-text-field',
          fieldValue: [null, null, null, null, null] as
            | (string | null)[]
            | string[]
            | string
            | null,
          labelFields: 'Atividade',
          label: 'Plano de atividades de Estágio',
          rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
          errorMessages: [],
          required: true,
        },
      },
    },
  },
  showSuccessModal: false,
  showErrorModal: false,
  loading: false,
  messageError: null,
  filePathId: null,
  createdInternshipProcessId: null,
};

//transformar numa util
const validateCnpj = (cnpj: string) => {
  if (!cnpj) {
    console.log('minha rola é obrigatória');
    return 'cnpj é obrigatório';
  }

  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
    console.log('minha rola é deve ter 14 cm');
    return 'cnpj deve ter 14 digitos';
  }

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) {
    console.log('rola inválida');
    return 'cnpj inválido';
  }

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado === parseInt(digitos.charAt(1))) {
    return true;
  }

  return 'cnpj inválido';
};

export function getInitialState(): FormTceData {
  return {
    sections: {
      aluno: {
        ...formTermCommitmentInitialState.sections.aluno,
      },
      concedente: {
        sectionTitle: 'Concedente',
        sectionData: {
          grantingCompanyName: {
            type: 'text',
            counter: 255,
            fieldValue: null,
            label: 'Razão Social',
            rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
            errorMessages: [],
            required: true,
          },
          grantingCompanyCNPJ: {
            type: 'text',
            counter: 255,
            fieldValue: null,
            label: 'CNPJ',
            rules: [(v: FieldValue) => validateCnpj(v as string)],
            errorMessages: [],
            required: true,
          },
          grantingCompanyPostalCode: {
            type: 'text',
            counter: 255,
            fieldValue: null,
            label: 'CEP',
            rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
            errorMessages: [],
            required: true,
          },
          grantingCompanyDistrict: {
            type: 'text',
            counter: 255,
            fieldValue: null,
            label: 'Bairro',
            rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
            errorMessages: [],
            required: true,
          },
          grantingCompanyCity: {
            type: 'text',
            counter: 255,
            fieldValue: null,
            label: 'Cidade',
            rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
            errorMessages: [],
            required: true,
          },
          grantingCompanyState: {
            type: 'text',
            counter: 255,
            fieldValue: null,
            label: 'UF',
            rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
            errorMessages: [],
            required: true,
          },
          grantingCompanyAddress: {
            type: 'text',
            counter: 255,
            fieldValue: null,
            label: 'Endereço',
            rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
            errorMessages: [],
            required: true,
          },
          grantingCompanyEmail: {
            type: 'text',
            counter: 255,
            fieldValue: null,
            label: 'Email',
            rules: [
              (v: FieldValue) => !!v || 'Este campo é obrigatório',
              (v: FieldValue) =>
                /.+@.+\..+/.test(v as string) || 'E-mail inválido',
            ],
            errorMessages: [],
            required: true,
          },
          grantingCompanyLegalRepresentative: {
            type: 'text',
            counter: 255,
            fieldValue: null,
            label: 'Representante Legal',
            rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
            errorMessages: [],
            required: true,
          },
          legalRepresentativeRole: {
            type: 'text',
            counter: 255,
            fieldValue: null,
            label: 'Função',
            rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
            errorMessages: [],
            required: true,
          },
          supervisor: {
            type: 'text',
            counter: 255,
            fieldValue: null,
            label: 'Supervisor',
            rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
            errorMessages: [],
            required: true,
          },
          supervisorPosition: {
            type: 'text',
            counter: 255,
            fieldValue: null,
            label: 'Cargo',
            rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
            errorMessages: [],
            required: true,
          },
        },
      },
      condicoesEstagio: {
        sectionTitle: 'Condições do Estágio',
        sectionData: {
          isMandatory: {
            type: 'radio-group',
            fieldValue: '1',
            label: 'Tipo de Estágio',
            rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
            errorMessages: [],
            required: true,
            options: [
              { label: 'Obrigatório', value: '1' },
              { label: 'Não-Obrigatório', value: '2' },
            ],
          },
          internshipStartDate: {
            type: 'date',
            fieldValue: null,
            label: 'Início de Estágio',
            rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
            errorMessages: [],
            required: true,
          },
          internshipEndDate: {
            type: 'date',
            fieldValue: null,
            label: 'Término de Estágio',
            rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
            errorMessages: [],
            required: true,
          },
          internshipStartTime: {
            type: 'time',
            fieldValue: null,
            label: 'Horario Inicial',
            rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
            errorMessages: [],
            required: true,
          },
          internshipEndTime: {
            type: 'time',
            fieldValue: null,
            label: 'Horario Final',
            rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
            errorMessages: [],
            required: true,
          },
          weeklyWorkload: {
            type: 'number',
            fieldValue: null,
            label: 'Jornada Semanal',
            rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
            errorMessages: [],
            required: true,
          },
          internshipGrant: {
            type: 'number',
            fieldValue: null,
            label: 'Bolsa Auxílio (R$)',
            rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
            errorMessages: [],
            required: true,
          },
          transportationAllowance: {
            type: 'number',
            fieldValue: null,
            label: 'Auxílio Transporte (R$)',
            rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
            errorMessages: [],
            required: true,
          },
          internshipActivityPlan: {
            type: 'multi-text-field',
            fieldValue: [null, null, null, null, null],
            labelFields: 'Atividade',
            label: 'Plano de atividades de Estágio',
            rules: [(v: FieldValue) => !!v || 'Este campo é obrigatório'],
            errorMessages: [],
            required: true,
          },
        },
      },
    },
    showSuccessModal: false,
    showErrorModal: false,
    loading: false,
    messageError: null,
    filePathId: null,
    createdInternshipProcessId: null,
  };
}
