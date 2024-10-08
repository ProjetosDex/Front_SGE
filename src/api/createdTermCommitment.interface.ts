export interface CreatedTermCommitment {
  numApoliceSeguro: string;
  nomeSeguradora: string;
  profOrientador: string;
  codSiape: string;
  dataInicioEstagio: string;
  dataFimEstagio: string;
  horaInicioEstagio: string;
  horaFimEstagio: string;
  jornadaSemanal: string;
  isObrigatorio: boolean;
  bolsaAuxilio: number;
  auxilioTransporte: number;
  razaoSocialConcedente: string;
  cnpjConcedente: string;
  cepConcedente: string;
  bairroConcedente: string;
  cidadeConcedente: string;
  ufConcedente: string;
  enderecoConcedente: string;
  emailConcedente: string;
  representanteLegalConcedente: string;
  funcaoRepresentanteLegalConcedente: string;
  supervisor: string;
  cargoSupervisor: string;
  user: {
    name: string;
    cpf: string;
    registration: string;
    email: string;
    telefone: string;
    courseStudy: string;
  };
}
