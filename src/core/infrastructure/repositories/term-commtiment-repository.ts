import type { CreateTermCommitmentDTO } from '@/core/application/dtos/createTermCommitmentDto';
import type { TermCommitmentRepositoryInterface } from '@/core/domain/repositories/term-commitment-repository-interface';
import type { FileApi } from '../api/file-api';
import { TermCommitmentApi } from '../api/termCommitmentApi';
import type { InternshipProcessHistoryApi } from '../api/internship-process-history-api';
import type { AssignTermCommitmentDTO } from '@/core/application/dtos/assign-term-commitment-dto';

export class TermCommitmentRepository
  implements TermCommitmentRepositoryInterface
{
  constructor(
    private readonly termCommitmentApi: TermCommitmentApi,
    private readonly fileApi: FileApi,
    private readonly internshipHistoryApi: InternshipProcessHistoryApi,
  ) {}
  async uploadTermCommitmentPdf(pfFormData: FormData) {
    return this.fileApi.uploadTermCommitmentPdf(pfFormData);
  }

  async create(createTermCommitmentDTO: CreateTermCommitmentDTO) {
    const response = await this.termCommitmentApi.createTermCommitment(
      createTermCommitmentDTO,
    );

    return response.data;
  }

  async assignTermCommitment(assignTermCommitmentDTO: AssignTermCommitmentDTO) {
    await this.termCommitmentApi.assignTermCommitment(assignTermCommitmentDTO);
  }

  async registerFileIdTermCommitment(
    internshipProcessId: string,
    fileId: string,
  ): Promise<void> {
    return this.internshipHistoryApi.registerFilePathIdInProcess(
      internshipProcessId,
      fileId,
      'TERM_COMMITMENT',
    );
  }
}
