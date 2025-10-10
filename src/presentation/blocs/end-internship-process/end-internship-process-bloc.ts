import { toRefs } from 'vue';
import { type EndInternshipProcessStateInterface } from './state/end-internship-process-state-interface';
import type { GetEligibleInternshipFinalizationProcessesUseCase } from '@/core/application/usecases/get-eligible-internship-finalization-processes-usecase';
import type { EndInternshipProcessDataTableDto } from '@/core/application/dtos/end-internship-process-data-table-dto';
import type { AssignEndInternshipProcessUseCase } from '@/core/application/usecases/assign-end-internship-process-usecase';
import type { Router } from 'vue-router';

export class EndInternshipProcessBloc {
  constructor(
    private readonly endInternshipProcessState: EndInternshipProcessStateInterface,
    private readonly router: Router,
    private readonly getEligibleInternshipFinalizationProcessesUseCase: GetEligibleInternshipFinalizationProcessesUseCase,
    private readonly assignEndInternshipProcessUseCase: AssignEndInternshipProcessUseCase,
  ) {}

  getState() {
    return toRefs(this.endInternshipProcessState.state);
  }

  clear() {
    this.endInternshipProcessState.clear();
  }

  navigateToInternshipProcessDetails(internshipProcessId: string) {
    this.endInternshipProcessState.setShowSuccessModal(false);
    this.router.push({
      name: 'detalhamentoProcessoEstagio',
      params: { id: internshipProcessId },
    });
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
    this.endInternshipProcessState.setLoading(true);

    const selectedInternshipProcessId = selectedProcess[0]?.id;
    if (!selectedInternshipProcessId) {
      this.endInternshipProcessState.setLoading(false);
      this.endInternshipProcessState.setMessageError(
        'Nenhum processo selecionado. Por favor, selecione um processo antes de enviar os arquivos.',
      );
      this.endInternshipProcessState.setShowErrorModal(true);
      return;
    }

    try {
      this.validateFileNames(files);
      await this.assignEndInternshipProcessUseCase.handle(
        selectedInternshipProcessId,
        files,
      );

      this.endInternshipProcessState.setLoading(false);

      this.endInternshipProcessState.setShowSuccessModal(true);
    } catch (error: any) {
      this.endInternshipProcessState.setLoading(false);
      this.endInternshipProcessState.setMessageError(error.message);
      this.endInternshipProcessState.setShowErrorModal(true);
    }
  }

  setSelectedProcess(
    endInternshipProcessDataTableDto: EndInternshipProcessDataTableDto[],
  ) {
    this.endInternshipProcessState.setSelectedProcess(
      endInternshipProcessDataTableDto,
    );
  }

  validateFileNames(files: File[]): void {
    const validFileNames = [
      'AutoAvaliacaoEstagiario.pdf',
      'AvaliacaoConcedente.pdf',
      'AvaliacaoProfessorOrientador.pdf',
    ];

    if (
      files.length !== 3 ||
      files.every((file) => !validFileNames.includes(file.name))
    ) {
      throw new Error(
        'Os arquivos devem conter os nomes: AutoAvaliacaoEstagiario, AvaliacaoConcedente e AvaliacaoProfessorOrientador. (deve conter os 3 arquivos em PDF)',
      );
    }
  }
}
