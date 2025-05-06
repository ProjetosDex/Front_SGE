import type { TermCommitmentRepositoryInterface } from '@/core/domain/repositories/termCommitmentRepositoryInterface';

export class UploadTermCommitmentPdfUseCase {
  constructor(
    private readonly termCommitmentRepository: TermCommitmentRepositoryInterface,
  ) {}

  async handle(pfFormData: FormData): Promise<string> {
    return await this.termCommitmentRepository.uploadTermCommitmentPdf(
      pfFormData,
    );
  }
}
