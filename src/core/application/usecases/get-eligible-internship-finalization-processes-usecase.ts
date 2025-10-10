import type { InternshipProcess } from '@/core/domain/entities/internshipProcess.entity';
import type { InternshipProcessRepositoryInterface } from '@/core/domain/repositories/internship-process-repository.interface';

export class GetEligibleInternshipFinalizationProcessesUseCase {
  constructor(
    private readonly internshipProcessRepository: InternshipProcessRepositoryInterface,
  ) {}

  async handle(): Promise<InternshipProcess[]> {
    return this.internshipProcessRepository.getEligibleToEndInternshipProcess();
  }
}
