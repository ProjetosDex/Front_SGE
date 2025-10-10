import type { InternshipProcessHistory } from '../entities/internshipProcessHistory.entity';

export interface InternshipProcessHistoryRepositoryInterface {
  getInternshipHistoriesByInternshipProcessId(
    internshipProcessId: string,
  ): Promise<InternshipProcessHistory[]>;
}
