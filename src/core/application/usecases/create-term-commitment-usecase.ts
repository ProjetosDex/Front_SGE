import type { TermCommitmentRepositoryInterface } from '@/core/domain/repositories/termCommitmentRepositoryInterface';
import type { CreateTermCommitmentDTO } from '../dtos/createTermCommitmentDto';

export class CreateTermCommitmentUseCase {
  constructor(
    private readonly termCommitmentRepository: TermCommitmentRepositoryInterface,
  ) {}

  async handle(createTermCommitmentDTO: CreateTermCommitmentDTO) {
    const createdTerm = await this.termCommitmentRepository.create(
      createTermCommitmentDTO,
    );

    return createdTerm;
  }
}
