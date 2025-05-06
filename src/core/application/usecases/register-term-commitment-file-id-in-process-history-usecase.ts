import type { TermCommitmentRepositoryInterface } from '@/core/domain/repositories/termCommitmentRepositoryInterface';

export class RegisterTermCommitmentFileIdInProcessHistoryUseCase {
  constructor(
    private readonly termCommitmentRepository: TermCommitmentRepositoryInterface,
  ) {}

  async handle(internshipProcessId: string, filePathId: string): Promise<void> {
    await this.termCommitmentRepository.registerFileIdTermCommitment(
      internshipProcessId,
      filePathId,
    );
  }
}
