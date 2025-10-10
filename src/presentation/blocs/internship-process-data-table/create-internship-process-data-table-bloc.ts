import type { InternshipProcessDataTableState } from '@/presentation/types/internship-process-data-table-types';
import { InternshipProcessDataTableBloc } from './internship-process-data-table-bloc';
import { useInternshipProcessDataTableState } from './internship-process-data-table-state';
import { useRouter } from 'vue-router';
import { GetPaginatedInternshipProcessUseCase } from '@/core/application/usecases/get-paginated-internship-process-usecase';
import { InternshipProcessRepository } from '@/core/infrastructure/repositories/internship-process-repository';
import { InternshipProcessApi } from '@/core/infrastructure/api/internship-process-api';

export function createInternshipProcessDataTableBloc(): InternshipProcessDataTableBloc {
  const internshipProcessDataTableState: InternshipProcessDataTableState =
    useInternshipProcessDataTableState();

  const router = useRouter();

  const internshipProcessApi = new InternshipProcessApi();
  const internshipProcessRepository = new InternshipProcessRepository(
    internshipProcessApi,
  );
  const getPaginatedInternshipProcessUseCase =
    new GetPaginatedInternshipProcessUseCase(internshipProcessRepository);

  const internshipProcessDataTableBloc = new InternshipProcessDataTableBloc(
    internshipProcessDataTableState,
    router,
    getPaginatedInternshipProcessUseCase,
  );

  return internshipProcessDataTableBloc;
}
