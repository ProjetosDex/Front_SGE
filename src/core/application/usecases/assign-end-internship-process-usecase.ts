import type { InternshipProcessRepositoryInterface } from '@/core/domain/repositories/internship-process-repository.interface';

export class AssignEndInternshipProcessUseCase {
  constructor(
    private readonly internshipProcessRepository: InternshipProcessRepositoryInterface,
  ) {}

  async handle(
    internshipProcessId: string,
    files?: File[],
    validate?: boolean,
    remark?: string,
  ) {
    await this.internshipProcessRepository.assignEndInternshipProcess(
      internshipProcessId,
      files,
      validate,
      remark,
    );
  }
}
