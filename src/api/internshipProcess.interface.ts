import type { InternshipProcessHistory } from './internshipProcessHistory.interface';
import type { TermCommitment } from './termCommitment.interface';
import type { User } from './user.interface';

export enum InternshipProcessStatus {
  CONCLUIDO = 'CONCLUIDO',
  EM_ANALISE = 'EM_ANALISE',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  RECUSADO = 'RECUSADO',
}

export enum InternshipProcessMovement {
  INICIO_ESTAGIO = 'INICIO_DE_ESTAGIO',
  RENOVACAO = 'RENOVACAO_DE_ESTAGIO',
  FIM_ESTAGIO = 'FIM_DE_ESTAGIO',
  CREDITACAO = 'CREDITACAO',
}

export interface InternshipProcess {
  id: string;
  movement: string;
  status: string;
  startDateProcess: Date;
  endDateProcess: Date;
  id_termCommitment: string;
  id_user: string;
  user: User;
  termCommitment: TermCommitment;
  statusHistory: InternshipProcessHistory[];
}
