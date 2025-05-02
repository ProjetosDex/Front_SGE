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

export const formTermCommitmentInitialState = {
  aluno: {
    sectionTitle: 'Aluno',
    sectionData: [
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'nome',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
        readonly: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'matricula',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
        readonly: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'cpf',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
        readonly: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'curso',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
        readonly: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'email',
        rules: [
          (v: string) => !!v || 'Este campo é obrigatório',
          (v: string) => /.+@.+\..+/.test(v) || 'E-mail inválido',
        ],
        errorMessages: [],
        required: true,
        readonly: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'email',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
        readonly: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'celular',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
        readonly: true,
      },
    ],
  },
  concedente: {
    sectionTitle: 'Concedente',
    sectionData: [
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'Razão Social',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'CNPJ',
        rules: [(v: string) => validateCnpj(v)],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'CEP',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'Bairro',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'Cidade',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'UF',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'Endereço',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'Email',
        rules: [
          (v: string) => !!v || 'Este campo é obrigatório',
          (v: string) => /.+@.+\..+/.test(v) || 'E-mail inválido',
        ],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'Representante Legal',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'Função',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'Supervisor',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'Cargo',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
    ],
  },
  condicoesEstagio: {
    sectionTitle: 'Condições do Estágio',
    sectionData: [
      {
        type: 'radio-group',
        fieldValue: '1',
        label: 'Tipo de Estágio',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
        options: [
          { label: 'Obrigatório', value: '1' },
          { label: 'Não-Obrigatório', value: '2' },
        ],
      },
      {
        type: 'date',
        fieldValue: '',
        label: 'Início de Estágio',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'date',
        fieldValue: '',
        label: 'Término de Estágio',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'time',
        fieldValue: '',
        label: 'Horario Inicial',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'time',
        fieldValue: '',
        label: 'Horario Final',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'number',
        fieldValue: '',
        label: 'Jornada Semanal',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'number',
        fieldValue: '',
        label: 'Bolsa Auxílio (R$)',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'number',
        fieldValue: '',
        label: 'Auxílio Transporte (R$)',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'multi-text-field',
        fieldValue: ['', '', '', '', ''],
        labelFields: 'Atividade',
        label: 'Plano de atividades de Estágio',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
    ],
  },
};
