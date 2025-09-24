import type { CreateTermCommitmentDTO } from '../dtos/createTermCommitmentDto';
import { generatePDF } from '@/components/pdf-models/term-commitment/generatePdf';

export class GenerateTermCommitmentPdfUseCase {
  async handle(createTermCommitmentDTO: CreateTermCommitmentDTO) {
    const termBlob = await generatePDF(createTermCommitmentDTO);
    const pfFormData = new FormData();
    pfFormData.append('file', termBlob, 'TermoCompromisso.pdf');

    return pfFormData;
  }
}
