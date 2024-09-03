export interface CreateTermCommitment {
  profOrientador: string;
  codSiape: string;
  dataInicioEstagio: string;
  dataFimEstagio: string;
  horaInicioEstagio: string;
  horaFimEstagio: string;
  isObrigatorio: boolean;
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
  id_user: string;
}
