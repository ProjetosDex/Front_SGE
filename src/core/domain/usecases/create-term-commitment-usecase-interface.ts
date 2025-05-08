import type { CreateTermCommitmentDTO } from '@/core/application/dtos/createTermCommitmentDto';

export interface CreateTermCommitmentUseCaseInterface {
  handle(createTermCommitmentDTO: CreateTermCommitmentDTO): any;
}
