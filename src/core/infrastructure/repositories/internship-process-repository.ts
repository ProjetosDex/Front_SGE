import type { InternshipProcessRepositoryInterface } from '@/core/domain/repositories/internship-process-repository.interface';
import type { InternshipProcess } from '@/core/domain/entities/internshipProcess.entity';
import type { InternshipProcessApi } from '../api/internship-process-api';
import type { InternshipProcessFilterDto } from '@/core/application/dtos/internship-process-filter-dto';

export class InternshipProcessRepository
  implements InternshipProcessRepositoryInterface
{
  constructor(private readonly internshipProcessApi: InternshipProcessApi) {}
  async getPaginatedProcess(
    internshipProcessFilterDto: InternshipProcessFilterDto,
  ): Promise<InternshipProcess[]> {
    return this.internshipProcessApi.getPaginatedProcess(
      internshipProcessFilterDto,
    );
  }

  async findById(id: string): Promise<InternshipProcess> {
    return this.internshipProcessApi.findById(id);
  }

  async getEligibleToEndInternshipProcess(): Promise<InternshipProcess[]> {
    return this.internshipProcessApi.getEligibleToEndInternshipProcess();
  }

  async assignEndInternshipProcess(
    internshipProcessId: string,
    files?: File[],
    validate?: boolean,
    remark?: string,
  ) {
    return this.internshipProcessApi.assignEndInternshipProcess(
      internshipProcessId,
      files,
      validate,
      remark,
    );
  }
}
