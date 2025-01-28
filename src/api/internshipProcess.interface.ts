import type { InternshipProcessHistory } from './internshipProcessHistory.interface';
import type { TermCommitment } from './termCommitment.interface';
import type { User } from './user.interface';

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
