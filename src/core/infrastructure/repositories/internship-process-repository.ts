import type { InternshipProcessRepositoryInterface } from '@/core/domain/repositories/internship-process-repository.interface';
import type { InternshipProcess } from '@/core/domain/entities/internshipProcess.entity';
import type { InternshipProcessApi } from '../api/internship-process-api';

export class InternshipProcessRepository
  implements InternshipProcessRepositoryInterface
{
  constructor(private readonly internshipProcessApi: InternshipProcessApi) {}

  findById(id: string): Promise<InternshipProcess> {
    return this.internshipProcessApi.findById(id);
  }
}
