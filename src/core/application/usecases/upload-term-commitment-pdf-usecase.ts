import type { TermCommitmentRepositoryInterface } from '@/core/domain/repositories/term-commitment-repository-interface';

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
