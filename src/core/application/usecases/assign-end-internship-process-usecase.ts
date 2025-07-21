import type { InternshipProcessRepositoryInterface } from '@/core/domain/repositories/internship-process-repository.interface';

export class AssignEndInternshipProcessUseCase {
  constructor(
    private readonly internshipProcessRepository: InternshipProcessRepositoryInterface,
  ) {}

  async handle(internshipProcessId: string, files: File[], validate?: boolean) {
    await this.internshipProcessRepository.assignEndInternshipProcess(
      internshipProcessId,
      files,
      validate,
    );
  }
}
