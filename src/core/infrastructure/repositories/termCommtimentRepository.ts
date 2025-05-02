import type { CreateTermCommitmentDTO } from '@/core/application/dtos/createTermCommitmentDto';
import type { TermCommitmentRepositoryInterface } from '@/core/domain/repositories/termCommitmentRepositoryInterface';

export class TermCommitmentRepository
  implements TermCommitmentRepositoryInterface
{
  create(createTermCommitmentDTO: CreateTermCommitmentDTO): any {
    throw new Error('Method not implemented.');
  }
}
