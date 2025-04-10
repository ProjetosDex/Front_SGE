import type { InternshipProcessHistory } from './internshipProcessHistory.entity';
import type { TermCommitment } from './termCommitment.entity';
import type { User } from './user.entity';

export enum InternshipProcessStatus {
  COMPLETED = 'COMPLETED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  IN_PROGRESS = 'IN_PROGRESS',
  REJECTED = 'REJECTED',
}

export enum InternshipProcessMovement {
  STAGE_START = 'INTERNSHIP_START',
  RENEWAL = 'INTERNSHIP_RENEWAL',
  STAGE_END = 'INTERNSHIP_END',
  CREDIT = 'CREDIT',
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
