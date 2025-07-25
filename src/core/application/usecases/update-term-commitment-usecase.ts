import type { TermCommitmentRepositoryInterface } from '@/core/domain/repositories/term-commitment-repository-interface';
import type { UpdateTermCommitmentDTO } from '../dtos/updateTermCommitmentDto';

export class UpdateTermCommitmentUseCase {
  constructor(
    private readonly termCommitmentRepository: TermCommitmentRepositoryInterface,
  ) {}

  async handle(
    internshipProcessId: string,
    updateTermCommitmentDTO: UpdateTermCommitmentDTO,
  ) {
    await this.termCommitmentRepository.updateTermCommitment(
      internshipProcessId,
      updateTermCommitmentDTO,
    );
  }
}
