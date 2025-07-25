import type { AssignTermCommitmentDTO } from '@/core/application/dtos/assign-term-commitment-dto';
import type { CreateTermCommitmentDTO } from '@/core/application/dtos/createTermCommitmentDto';
import type { UpdateTermCommitmentDTO } from '@/core/application/dtos/updateTermCommitmentDto';

export interface TermCommitmentRepositoryInterface {
  create(createTermCommitmentDTO: CreateTermCommitmentDTO): any;
  uploadTermCommitmentPdf(pfFormData: FormData): Promise<string>;
  assignTermCommitment(
    assignTermCommitmentDTO: AssignTermCommitmentDTO,
  ): Promise<void>;
  registerFileIdTermCommitment(
    internshipProcessId: string,
    fileId: string,
  ): Promise<void>;
  updateTermCommitment(
    internshipProcessId: string,
    updateTermCommitmentDTO: UpdateTermCommitmentDTO,
  ): Promise<void>;
}
