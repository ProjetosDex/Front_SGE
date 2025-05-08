import type { InternshipProcess } from '@/core/domain/entities/internshipProcess.entity';
import type { InternshipProcessRepositoryInterface } from '@/core/domain/repositories/internship-process-repository.interface';

export class FindInternshipProcessByIdUseCase {
  constructor(
    private readonly internshipProcessRepository: InternshipProcessRepositoryInterface,
  ) {}

  async handle(id: string): Promise<InternshipProcess> {
    return this.internshipProcessRepository.findById(id);
  }
}
