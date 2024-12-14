export interface CreateTermCommitment {
  dataInicioEstagio: string;
  dataFimEstagio: string;
  horaInicioEstagio: string;
  horaFimEstagio: string;
  jornadaSemanal: number;
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
  id_user: string;
  planoAtividadesEstagio: string[];
}
