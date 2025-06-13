import { FindInternshipProcessByIdUseCase } from '@/core/application/usecases/find-internship-process-by-id-usecase';
import { InternshipProcessApi } from '@/core/infrastructure/api/internship-process-api';
import { InternshipProcessRepository } from '@/core/infrastructure/repositories/internship-process-repository';
import { InternshipProcessDetailsBloc } from './internship-process-details-bloc';
import { useInternshipProcessDetailsState } from './internship-process-details-state';
import type { InternshipProcessDetailsState } from '@/presentation/types/internship-process-details-types';

export function createInternshipProcessDetailsBloc(): InternshipProcessDetailsBloc {
  const internshipProcessDetailsState: InternshipProcessDetailsState =
    useInternshipProcessDetailsState();

  const internshipProcessApi = new InternshipProcessApi();
  const internshipProcessRepository = new InternshipProcessRepository(
    internshipProcessApi,
  );
  const findInternshipProcessByIdUseCase = new FindInternshipProcessByIdUseCase(
    internshipProcessRepository,
  );

  const internshipProcessDetailsBloc = new InternshipProcessDetailsBloc(
    internshipProcessDetailsState,
    findInternshipProcessByIdUseCase,
  );

  return internshipProcessDetailsBloc;
}
