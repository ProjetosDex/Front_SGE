import type { TermCommitmentRepositoryInterface } from '@/core/domain/repositories/term-commitment-repository-interface';
import type { AssignTermCommitmentDTO } from '../dtos/assign-term-commitment-dto';

export class AssignTermCommitmentUseCase {
  constructor(
    private readonly termCommitmentRepository: TermCommitmentRepositoryInterface,
  ) {}

  async handle(assignTermCommitmentDTO: AssignTermCommitmentDTO) {
    await this.termCommitmentRepository.assignTermCommitment(
      assignTermCommitmentDTO,
    );
  }
}
