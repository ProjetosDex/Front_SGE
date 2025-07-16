import { toRefs } from 'vue';
import { type EndInternshipProcessStateInterface } from './state/end-internship-process-state-interface';
import type { GetEligibleInternshipFinalizationProcessesUseCase } from '@/core/application/usecases/get-eligible-internship-finalization-processes-usecase';
import type { EndInternshipProcessDataTableDto } from '@/core/application/dtos/end-internship-process-data-table-dto';

export class EndInternshipProcessBloc {
  constructor(
    private readonly endInternshipProcessState: EndInternshipProcessStateInterface,
    private readonly getEligibleInternshipFinalizationProcessesUseCase: GetEligibleInternshipFinalizationProcessesUseCase,
    private readonly assignEndInternshipProcessUseCase: any,
  ) {}

  getState() {
    return toRefs(this.endInternshipProcessState.state);
  }

  clear() {
    this.endInternshipProcessState.clear();
  }

  async getEligibleInternshipFinalizationProcesses() {
    const processes =
      await this.getEligibleInternshipFinalizationProcessesUseCase.handle();

    this.endInternshipProcessState.setEligibleInternshipFinalizationProcesses(
      processes,
    );
  }

  async registerAssignEndInternshipProcess(
    selectedProcess: EndInternshipProcessDataTableDto[],
    files: File[],
  ) {
    const selectedInternshipProcessId = selectedProcess[0].id;
    if (!selectedInternshipProcessId) {
      console.log('tu é glsk é ? seleciona um ae irmão');
    }

    this.assignEndInternshipProcessUseCase.handle(
      selectedInternshipProcessId,
      files,
    );
  }

  setSelectedProcess(
    endInternshipProcessDataTableDto: EndInternshipProcessDataTableDto[],
  ) {
    this.endInternshipProcessState.setSelectedProcess(
      endInternshipProcessDataTableDto,
    );
  }
}
