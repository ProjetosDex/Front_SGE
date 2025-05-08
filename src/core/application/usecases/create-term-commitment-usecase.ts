import type { TermCommitmentRepositoryInterface } from '@/core/domain/repositories/term-commitment-repository-interface';
import type { CreateTermCommitmentDTO } from '../dtos/createTermCommitmentDto';
import type { CreateTermCommitmentUseCaseInterface } from '@/core/domain/usecases/create-term-commitment-usecase-interface';

export class CreateTermCommitmentUseCase
  implements CreateTermCommitmentUseCaseInterface
{
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
