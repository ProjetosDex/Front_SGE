import type { InternshipProcessHistory } from '@/core/domain/entities/internshipProcessHistory.entity';
import type { InternshipProcessHistoryRepositoryInterface } from '@/core/domain/repositories/internship-process-history-repository-interface';

export class GetHistoriesByInternshipProcessIdUseCase {
  constructor(
    private readonly internshipProcessHistoryRepository: InternshipProcessHistoryRepositoryInterface,
  ) {}

  async handle(
    internshipProcessId: string,
  ): Promise<InternshipProcessHistory[]> {
    return this.internshipProcessHistoryRepository.getInternshipHistoriesByInternshipProcessId(
      internshipProcessId,
    );
  }
}
