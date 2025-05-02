import type { CreateTermCommitmentDTO } from '@/core/application/dtos/createTermCommitmentDto';
import type { TermCommitment } from '../entities/termCommitment.entity';

export interface TermCommitmentRepositoryInterface {
  create(createTermCommitmentDTO: CreateTermCommitmentDTO): any;
}
