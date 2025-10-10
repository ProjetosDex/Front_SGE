import type { InternshipProcessRepositoryInterface } from '@/core/domain/repositories/internship-process-repository.interface';
import type { InternshipProcess } from '@/core/domain/entities/internshipProcess.entity';
import type { InternshipProcessFilterDto } from '../dtos/internship-process-filter-dto';

export class GetPaginatedInternshipProcessUseCase {
  constructor(
    private readonly internshipProcessRepository: InternshipProcessRepositoryInterface,
  ) {}

  async handle(
    internshipProcessFilterDto: InternshipProcessFilterDto,
  ): Promise<InternshipProcess[]> {
    return this.internshipProcessRepository.getPaginatedProcess(
      internshipProcessFilterDto,
    );
  }
}
