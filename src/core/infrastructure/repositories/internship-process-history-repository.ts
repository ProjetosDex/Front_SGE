import type { InternshipProcessHistoryRepositoryInterface } from '@/core/domain/repositories/internship-process-history-repository-interface';
import type { InternshipProcessHistory } from '@/core/domain/entities/internshipProcessHistory.entity';
import type { InternshipProcessHistoryApi } from '../api/internship-process-history-api';

export class InternshipProcessHistoryRepository
  implements InternshipProcessHistoryRepositoryInterface
{
  constructor(
    private readonly internshipProcessHistoryApi: InternshipProcessHistoryApi,
  ) {}
  getInternshipHistoriesByInternshipProcessId(
    internshipProcessId: string,
  ): Promise<InternshipProcessHistory[]> {
    return this.internshipProcessHistoryApi.getInternshipHistoriesByInternshipProcessId(
      internshipProcessId,
    );
  }
}
