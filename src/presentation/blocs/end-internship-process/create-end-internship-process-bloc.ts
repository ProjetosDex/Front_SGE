import { InternshipProcessApi } from '@/core/infrastructure/api/internship-process-api';
import { InternshipProcessRepository } from '@/core/infrastructure/repositories/internship-process-repository';
import { EndInternshipProcessBloc } from './end-internship-process-bloc';
import { GetEligibleInternshipFinalizationProcessesUseCase } from '@/core/application/usecases/get-eligible-internship-finalization-processes-usecase';
import { useEndInternshipProcessState } from './state/end-internship-process-state';
import { AssignEndInternshipProcessUseCase } from '@/core/application/usecases/assign-end-internship-process-usecase';
import { useRouter } from 'vue-router';

export function createEndInternshipProcessBloc(): EndInternshipProcessBloc {
  const endInternshipProcessState = useEndInternshipProcessState();
  const internshipProcessApi = new InternshipProcessApi();
  const internshipProcessRepository = new InternshipProcessRepository(
    internshipProcessApi,
  );
  const getEligibleInternshipFinalizationProcessesUseCase =
    new GetEligibleInternshipFinalizationProcessesUseCase(
      internshipProcessRepository,
    );

  const assignEndInternshipProcessUseCase =
    new AssignEndInternshipProcessUseCase(internshipProcessRepository);

  const router = useRouter();

  const endInternshipProcessBloc = new EndInternshipProcessBloc(
    endInternshipProcessState,
    router,
    getEligibleInternshipFinalizationProcessesUseCase,
    assignEndInternshipProcessUseCase,
  );

  return endInternshipProcessBloc;
}
