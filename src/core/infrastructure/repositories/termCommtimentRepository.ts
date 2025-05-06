import type { CreateTermCommitmentDTO } from '@/core/application/dtos/createTermCommitmentDto';
import type { TermCommitmentRepositoryInterface } from '@/core/domain/repositories/termCommitmentRepositoryInterface';
import type { FileApi } from '../api/file-api';
import { TermCommitmentApi } from '../api/termCommitmentApi';
import type { InternshipHistoryApi } from '../api/internship-history-api';

export class TermCommitmentRepository
  implements TermCommitmentRepositoryInterface
{
  constructor(
    private readonly termCommitmentApi: TermCommitmentApi,
    private readonly fileApi: FileApi,
    private readonly internshipHistoryApi: InternshipHistoryApi,
  ) {}
  async uploadTermCommitmentPdf(pfFormData: FormData) {
    return this.fileApi.uploadTermCommitmentPdf(pfFormData);
  }

  async create(createTermCommitmentDTO: CreateTermCommitmentDTO) {
    console.log(createTermCommitmentDTO);
    return this.termCommitmentApi.createTermCommitment(createTermCommitmentDTO);
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
