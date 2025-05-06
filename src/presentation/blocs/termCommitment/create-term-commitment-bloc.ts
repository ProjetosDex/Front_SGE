import { CreateTermCommitmentUseCase } from '@/core/application/usecases/create-term-commitment-usecase';
import { GenerateTermCommitmentPdfUseCase } from '@/core/application/usecases/generate-term-commitment-pdf-usecase';
import { RegisterTermCommitmentFileIdInProcessHistoryUseCase } from '@/core/application/usecases/register-term-commitment-file-id-in-process-history-usecase';
import { UploadTermCommitmentPdfUseCase } from '@/core/application/usecases/upload-term-commitment-pdf-usecase';
import { FileApi } from '@/core/infrastructure/api/file-api';
import { InternshipHistoryApi } from '@/core/infrastructure/api/internship-history-api';
import { TermCommitmentApi } from '@/core/infrastructure/api/termCommitmentApi';
import { TermCommitmentRepository } from '@/core/infrastructure/repositories/termCommtimentRepository';
import { FormTermCommitmentStore } from '@/stores/formTermCommitment/form-term-commitment-store';
import { TermCommitmentBloc } from './termCommitment.bloc';

export function createTermCommitmentBloc() {
  const formTermCommitmentStore = new FormTermCommitmentStore();
  const termCommitmentApi = new TermCommitmentApi();
  const fileApi = new FileApi();
  const internshipHistoryApi = new InternshipHistoryApi();
  const termCommitmentRepository = new TermCommitmentRepository(
    termCommitmentApi,
    fileApi,
    internshipHistoryApi,
  );
  const createTermCommitmentUseCase = new CreateTermCommitmentUseCase(
    termCommitmentRepository,
  );

  const uploadTermCommitmentPdfUseCase = new UploadTermCommitmentPdfUseCase(
    termCommitmentRepository,
  );

  const registerTermCommitmentFileIdInProcessHistoryUseCase =
    new RegisterTermCommitmentFileIdInProcessHistoryUseCase(
      termCommitmentRepository,
    );

  const generateTermCommitmentPdfUseCase =
    new GenerateTermCommitmentPdfUseCase();

  const formTermCommitmentBloc = new TermCommitmentBloc(
    formTermCommitmentStore,
    createTermCommitmentUseCase,
    generateTermCommitmentPdfUseCase,
    uploadTermCommitmentPdfUseCase,
    registerTermCommitmentFileIdInProcessHistoryUseCase,
  );

  return formTermCommitmentBloc;
}
