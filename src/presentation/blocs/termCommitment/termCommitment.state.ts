import type {
  FieldValue,
  FormTceData,
} from '@/presentation/types/term-commitment-form-types';

export const validateCnpj = (cnpj: string) => {
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
        registration: {
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
          fieldValue: ['', '', '', '', ''],
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
