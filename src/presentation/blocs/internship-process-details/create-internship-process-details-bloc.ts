import { FindInternshipProcessByIdUseCase } from '@/core/application/usecases/find-internship-process-by-id-usecase';
import { InternshipProcessApi } from '@/core/infrastructure/api/internship-process-api';
import { InternshipProcessRepository } from '@/core/infrastructure/repositories/internship-process-repository';
import { InternshipProcessDetailsBloc } from './internship-process-details-bloc';
import { useInternshipProcessDetailsState } from './state/internship-process-details-state';
import { useRouter } from 'vue-router';
import type { InternshipProcessDetailsStateInterface } from './state/internship-process-details-state-interface';
import { useAuthStore } from '@/stores/auth.store';
import { InternshipProcessHistoryApi } from '@/core/infrastructure/api/internship-process-history-api';
import { InternshipProcessHistoryRepository } from '@/core/infrastructure/repositories/internship-process-history-repository';
import { GetHistoriesByInternshipProcessIdUseCase } from '@/core/application/usecases/get-histories-by-internship-process-id-usecase';
import { AssignTermCommitmentUseCase } from '@/core/application/usecases/assign-term-commitment-usecase';
import { TermCommitmentApi } from '@/core/infrastructure/api/termCommitmentApi';
import { TermCommitmentRepository } from '@/core/infrastructure/repositories/term-commtiment-repository';
import { FileApi } from '@/core/infrastructure/api/file-api';
import { AssignEndInternshipProcessUseCase } from '@/core/application/usecases/assign-end-internship-process-usecase';

export function createInternshipProcessDetailsBloc(): InternshipProcessDetailsBloc {
  const router = useRouter();

  const internshipProcessDetailsState: InternshipProcessDetailsStateInterface =
    useInternshipProcessDetailsState();

  const authState = useAuthStore();

  const internshipProcessApi = new InternshipProcessApi();
  const termCommitmentApi = new TermCommitmentApi();
  const fileApi = new FileApi();
  const internshipHistoryApi = new InternshipProcessHistoryApi();

  const internshipProcessRepository = new InternshipProcessRepository(
    internshipProcessApi,
  );
  const termCommitmentRepository = new TermCommitmentRepository(
    termCommitmentApi,
    fileApi,
    internshipHistoryApi,
  );

  const findInternshipProcessByIdUseCase = new FindInternshipProcessByIdUseCase(
    internshipProcessRepository,
  );

  const internshipProcessHistoryRepository =
    new InternshipProcessHistoryRepository(internshipHistoryApi);

  const getHistoriesByInternshipProcessIdUseCase =
    new GetHistoriesByInternshipProcessIdUseCase(
      internshipProcessHistoryRepository,
    );

  const assignTermCommitmentUseCase = new AssignTermCommitmentUseCase(
    termCommitmentRepository,
  );

  const assignEndInternshipProcessUseCase =
    new AssignEndInternshipProcessUseCase(internshipProcessRepository);

  const internshipProcessDetailsBloc = new InternshipProcessDetailsBloc(
    router,
    internshipProcessDetailsState,
    authState,
    findInternshipProcessByIdUseCase,
    getHistoriesByInternshipProcessIdUseCase,
    assignTermCommitmentUseCase,
    assignEndInternshipProcessUseCase,
  );

  return internshipProcessDetailsBloc;
}
