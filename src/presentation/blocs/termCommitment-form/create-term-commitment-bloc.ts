import { CreateTermCommitmentUseCase } from '@/core/application/usecases/create-term-commitment-usecase';
import { FileApi } from '@/core/infrastructure/api/file-api';
import { InternshipProcessHistoryApi } from '@/core/infrastructure/api/internship-process-history-api';
import { TermCommitmentApi } from '@/core/infrastructure/api/termCommitmentApi';
import { TermCommitmentRepository } from '@/core/infrastructure/repositories/term-commtiment-repository';
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
import { FormTermCommitmentState } from './state/term-commitment-form-state';
import { useRouter } from 'vue-router';
import { UpdateTermCommitmentUseCase } from '@/core/application/usecases/update-term-commitment-usecase';

export function createTermCommitmentBloc() {
  const formTermCommitmentState = new FormTermCommitmentState();
  const termCommitmentApi = new TermCommitmentApi();
  const userApi = new UserApi();
  const fileApi = new FileApi();
  const internshipProcessApi = new InternshipProcessApi();
  const internshipHistoryApi = new InternshipProcessHistoryApi();
  const addressCepApi = new AddressCepApi();
  const termCommitmentRepository = new TermCommitmentRepository(
    termCommitmentApi,
    fileApi,
    internshipHistoryApi,
  );

  const router = useRouter();

  const userRepository = new UserRepository(userApi);

  const internshipProcessRepository = new InternshipProcessRepository(
    internshipProcessApi,
  );

  const addressRepository = new AddressRepository(addressCepApi);

  const createTermCommitmentUseCase = new CreateTermCommitmentUseCase(
    termCommitmentRepository,
  );

  const getUserUseCase = new GetUserUseCase(userRepository);

  const findInternshipProcessByIdUseCase = new FindInternshipProcessByIdUseCase(
    internshipProcessRepository,
  );

  const getAddressInformationByPostalCodeUseCase =
    new GetAddressInformationByPostalCodeUseCase(addressRepository);

  const updateTermCommitmentUseCase = new UpdateTermCommitmentUseCase(
    termCommitmentRepository,
  );

  const formTermCommitmentBloc = new TermCommitmentBloc(
    formTermCommitmentState,
    router,
    createTermCommitmentUseCase,
    getUserUseCase,
    findInternshipProcessByIdUseCase,
    getAddressInformationByPostalCodeUseCase,
    updateTermCommitmentUseCase,
  );

  return formTermCommitmentBloc;
}
