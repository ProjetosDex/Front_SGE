import type { TermCommitmentRepositoryInterface } from '@/core/domain/repositories/termCommitmentRepositoryInterface';
import type { CreateTermCommitmentDTO } from '../dtos/createTermCommitmentDto';
import { generatePDF } from '@/components/pdf-models/term-commitment/generatePdf';

export class CreateTermCommitmentUseCase {
  constructor(
    private readonly termCommitmentRepository: TermCommitmentRepositoryInterface,
  ) // private readonly uploadFileUseCase: UploadFileUseCase
  {}

  async handle(createTermCommitmentDTO: CreateTermCommitmentDTO) {
    const createdTerm = await this.termCommitmentRepository.create(
      createTermCommitmentDTO,
    );
    const termBlob = await generatePDF(createdTerm);

    const formData = new FormData();
    formData.append('file', termBlob, 'termo_compromisso.pdf');

    //chamar o use case de upload
  }
}
