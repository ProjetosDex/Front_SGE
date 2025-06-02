import type { InternshipProcessRepositoryInterface } from '@/core/domain/repositories/internship-process-repository.interface';
import type { InternshipProcess } from '@/core/domain/entities/internshipProcess.entity';
import type { InternshipProcessApi } from '../api/internship-process-api';
import { UserRole } from '@/core/domain/entities/user.entity';
import type { TermCommitmentFilterDto } from '@/core/application/dtos/term-commitment-filter-dto';
import type { InternshipProcessFilterDto } from '@/core/application/dtos/internship-process-filter-dto';

export class InternshipProcessRepository
  implements InternshipProcessRepositoryInterface
{
  constructor(private readonly internshipProcessApi: InternshipProcessApi) {}
  getPaginatedProcess(
    internshipProcessFilterDto: InternshipProcessFilterDto,
  ): Promise<InternshipProcess[]> {
    return this.internshipProcessApi.getPaginatedProcess(
      internshipProcessFilterDto,
    );
  }

  findById(id: string): Promise<InternshipProcess> {
    return this.internshipProcessApi.findById(id);
  }
}
