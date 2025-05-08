import type { TermCommitmentRepositoryInterface } from '@/core/domain/repositories/term-commitment-repository-interface';

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
