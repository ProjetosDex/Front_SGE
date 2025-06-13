import type { FindInternshipProcessByIdUseCase } from '@/core/application/usecases/find-internship-process-by-id-usecase';
import type { InternshipProcessDetailsState } from '@/presentation/types/internship-process-details-types';

export class InternshipProcessDetailsBloc {
  constructor(
    private readonly internshipProcessDetailsState: InternshipProcessDetailsState,
    private readonly findInternshipProcessByIdUseCase: FindInternshipProcessByIdUseCase,
  ) {}

  getState() {
    return this.internshipProcessDetailsState.state;
  }

  findInternshipProcessById() {}

  clear() {
    this.internshipProcessDetailsState.clear();
  }
}
