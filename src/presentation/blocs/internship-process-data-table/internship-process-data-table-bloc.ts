import type { GetPaginatedInternshipProcessUseCase } from '@/core/application/usecases/get-paginated-internship-process-usecase';
import type { InternshipProcessDataTableState } from '@/presentation/types/internship-process-data-table-types';
import type { Router } from 'vue-router';

export class InternshipProcessDataTableBloc {
  constructor(
    private readonly internshipProcessDataTableState: InternshipProcessDataTableState,
    private readonly router: Router,
    private readonly getPaginatedInternshipProcessUseCase: GetPaginatedInternshipProcessUseCase,
  ) {}

  getState() {
    return this.internshipProcessDataTableState.state;
  }

  openInternshipProcessDetails(internshipProcessId: string) {
    this.router.push({
      name: 'detalhamentoProcessoEstagioDEX',
      params: { id: internshipProcessId },
    });
  }

  searchByString(searchValue: string) {
    this.internshipProcessDataTableState.state.searchValue = searchValue;
  }

  async getPaginatedInternshipProcess() {
    const { filters } = this.internshipProcessDataTableState.state;

    const internshipProcess =
      await this.getPaginatedInternshipProcessUseCase.handle(filters);

    console.log('eu sou o getPaginated');
    console.log(internshipProcess);
  }

  clearFilters() {
    this.internshipProcessDataTableState.clearFilters();
  }
}
