import type { InternshipProcessHistory } from './internshipProcessHistory.entity';
import type { TermCommitment } from './termCommitment.entity';
import type { User } from './user.entity';

export enum InternshipProcessStatus {
  COMPLETED = 'COMPLETED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  IN_PROGRESS = 'IN_PROGRESS',
  REJECTED = 'REJECTED',
}

export const InternshipProcessStatusTranslation: Record<
  InternshipProcessStatus,
  string
> = {
  [InternshipProcessStatus.COMPLETED]: 'Concluído',
  [InternshipProcessStatus.UNDER_REVIEW]: 'Em análise',
  [InternshipProcessStatus.IN_PROGRESS]: 'Em andamento',
  [InternshipProcessStatus.REJECTED]: 'Rejeitado',
};

export enum InternshipProcessMovement {
  STAGE_START = 'INTERNSHIP_START',
  STAGE_END = 'INTERNSHIP_END',
}

export const InternshipProcessMovementTranslation: Record<
  InternshipProcessMovement,
  string
> = {
  [InternshipProcessMovement.STAGE_START]: 'Início de estágio',
  [InternshipProcessMovement.STAGE_END]: 'Fim de estágio',
};

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
