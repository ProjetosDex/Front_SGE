import { InternshipProcessDataTableMapper } from '@/core/application/mappers/internship-process-data-table-mapper';
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
      name: 'detalhamentoProcessoEstagio',
      params: { id: internshipProcessId },
    });
  }

  searchByFilters(filters: any) {
    this.internshipProcessDataTableState.state.filters = filters;
    this.getPaginatedInternshipProcess();
  }

  searchByString(searchValue: string) {
    this.internshipProcessDataTableState.state.searchValue = searchValue;
  }

  async getPaginatedInternshipProcess() {
    const { filters } = this.internshipProcessDataTableState.state;

    const internshipProcess =
      await this.getPaginatedInternshipProcessUseCase.handle(filters);

    const internshipProcessRegisters =
      InternshipProcessDataTableMapper.toDataTable(internshipProcess);

    this.internshipProcessDataTableState.setData(internshipProcessRegisters);
  }

  clearFilters() {
    this.internshipProcessDataTableState.clearFilters();
  }
}
