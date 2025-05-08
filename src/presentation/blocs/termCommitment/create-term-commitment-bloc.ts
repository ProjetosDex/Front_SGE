import { CreateTermCommitmentUseCase } from '@/core/application/usecases/create-term-commitment-usecase';
import { GenerateTermCommitmentPdfUseCase } from '@/core/application/usecases/generate-term-commitment-pdf-usecase';
import { RegisterTermCommitmentFileIdInProcessHistoryUseCase } from '@/core/application/usecases/register-term-commitment-file-id-in-process-history-usecase';
import { UploadTermCommitmentPdfUseCase } from '@/core/application/usecases/upload-term-commitment-pdf-usecase';
import { FileApi } from '@/core/infrastructure/api/file-api';
import { InternshipHistoryApi } from '@/core/infrastructure/api/internship-history-api';
import { TermCommitmentApi } from '@/core/infrastructure/api/termCommitmentApi';
import { TermCommitmentRepository } from '@/core/infrastructure/repositories/term-commtiment-repository';
import { FormTermCommitmentStore } from '@/stores/formTermCommitment/form-term-commitment-store';
import { TermCommitmentBloc } from './termCommitment.bloc';
import { GetUserUseCase } from '@/core/application/usecases/get-user-usecase';
import { UserRepository } from '@/core/infrastructure/repositories/user-repository';
import { UserApi } from '@/core/infrastructure/api/user-api';
import { FindInternshipProcessByIdUseCase } from '@/core/application/usecases/find-internship-process-by-id-usecase';
import { InternshipProcessApi } from '@/core/infrastructure/api/internship-process-api';
import { InternshipProcessRepository } from '@/core/infrastructure/repositories/internship-process-repository';
import { GetAddressInformationByPostalCodeUseCase } from '@/core/application/usecases/get-address-information-by-postal-code-usecase';
import { AddressRepository } from '@/core/infrastructure/repositories/address-repository';
import { AddressCepApi } from '@/core/infrastructure/api/address-cep-api';

export function createTermCommitmentBloc() {
  const formTermCommitmentStore = new FormTermCommitmentStore();
  const termCommitmentApi = new TermCommitmentApi();
  const userApi = new UserApi();
  const fileApi = new FileApi();
  const internshipProcessApi = new InternshipProcessApi();
  const internshipHistoryApi = new InternshipHistoryApi();
  const addressCepApi = new AddressCepApi();
  const termCommitmentRepository = new TermCommitmentRepository(
    termCommitmentApi,
    fileApi,
    internshipHistoryApi,
  );

  const userRepository = new UserRepository(userApi);

  const internshipProcessRepository = new InternshipProcessRepository(
    internshipProcessApi,
  );

  const addressRepository = new AddressRepository(addressCepApi);

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

  const getUserUseCase = new GetUserUseCase(userRepository);

  const findInternshipProcessByIdUseCase = new FindInternshipProcessByIdUseCase(
    internshipProcessRepository,
  );

  const getAddressInformationByPostalCodeUseCase =
    new GetAddressInformationByPostalCodeUseCase(addressRepository);

  const formTermCommitmentBloc = new TermCommitmentBloc(
    formTermCommitmentStore,
    createTermCommitmentUseCase,
    generateTermCommitmentPdfUseCase,
    uploadTermCommitmentPdfUseCase,
    registerTermCommitmentFileIdInProcessHistoryUseCase,
    getUserUseCase,
    findInternshipProcessByIdUseCase,
    getAddressInformationByPostalCodeUseCase,
  );

  return formTermCommitmentBloc;
}
