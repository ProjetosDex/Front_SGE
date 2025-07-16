import type { FindInternshipProcessByIdUseCase } from '@/core/application/usecases/find-internship-process-by-id-usecase';
import type { Router } from 'vue-router';
import {
  MovementToStepTranslation,
  type InternshipProcessDetailsStateInterface,
} from './state/internship-process-details-state-interface';
import type { GetHistoriesByInternshipProcessIdUseCase } from '@/core/application/usecases/get-histories-by-internship-process-id-usecase';
import type { InternshipProcessHistory } from '@/core/domain/entities/internshipProcessHistory.entity';
import type { InternshipProcessMovement } from '@/core/domain/entities/internshipProcess.entity';
import type { AssignTermCommitmentUseCase } from '@/core/application/usecases/assign-term-commitment-usecase';
import { UserRole } from '@/core/domain/entities/user.entity';

export class InternshipProcessDetailsBloc {
  constructor(
    private readonly router: Router,
    private readonly internshipProcessDetailsState: InternshipProcessDetailsStateInterface,
    private readonly authState: any,
    private readonly findInternshipProcessByIdUseCase: FindInternshipProcessByIdUseCase,
    private readonly getHistoriesByInternshipProcessIdUseCase: GetHistoriesByInternshipProcessIdUseCase,
    private readonly assignTermCommitmentUseCase: AssignTermCommitmentUseCase,
  ) {}

  async loadInternshipProcessDetails() {
    const internshipProcessId = this.router.currentRoute.value.params
      .id as string;
    if (internshipProcessId) {
      const internShipProcessHistoryData =
        await this.getHistoriesByInternshipProcessIdUseCase.handle(
          internshipProcessId,
        );
      this.loadHistoryDataInSteps(internShipProcessHistoryData);
    }
  }

  getState() {
    return this.internshipProcessDetailsState.state;
  }

  getAuthState() {
    return this.authState.state;
  }

  loadHistoryDataInSteps(
    internshipProcessHistories: InternshipProcessHistory[],
  ) {
    const latestHistories = this.getLatestProcessHistory(
      internshipProcessHistories,
    );
    const currentHistory = this.getCurrentHistory(latestHistories);
    const currentStep =
      MovementToStepTranslation[
        currentHistory?.movement as InternshipProcessMovement
      ];
    this.internshipProcessDetailsState.setCurrentStep(currentStep);
    this.internshipProcessDetailsState.setSelectedStep(currentStep);
    this.internshipProcessDetailsState.setStepData(latestHistories);
  }

  async rejectTermCommitment(rejectionReason: string) {
    await this.assignTermCommitmentUseCase.handle({
      internshipProcessId: this.router.currentRoute.value.params.id as string,
      remark: rejectionReason,
      validate: false,
    });

    window.location.reload();
  }

  async registerAssignTermCommitment(files: File[], userRole?: string | null) {
    const validate =
      userRole === UserRole.ADMINISTRATOR || userRole === UserRole.EMPLOYEE
        ? true
        : false;
    console.log(`validate: ${validate}`);
    await this.assignTermCommitmentUseCase.handle({
      internshipProcessId: this.router.currentRoute.value.params.id as string,
      file: files[0],
      validate,
    });

    window.location.reload();
  }

  getCurrentHistory(internshipProcessHistories: InternshipProcessHistory[]) {
    if (!internshipProcessHistories || internshipProcessHistories.length === 0)
      return null;

    console.log(internshipProcessHistories);
    const ongoing = internshipProcessHistories.find((h) => !h.endDate);
    console.log(ongoing);
    if (ongoing) return ongoing;

    return internshipProcessHistories
      .slice()
      .sort(
        (a, b) =>
          new Date(b.endDate!).getTime() - new Date(a.endDate!).getTime(),
      )[0];
  }

  getLatestProcessHistory(
    internshipProcessHistories: InternshipProcessHistory[],
  ): InternshipProcessHistory[] {
    return Object.values(
      internshipProcessHistories.reduce(
        (acc, history) => {
          const existing = acc[history.movement];

          // Se não existe ainda, adiciona
          if (!existing) {
            acc[history.movement] = history;
            return acc;
          }

          // Prioriza histórico sem endDate (em andamento)
          if (!history.endDate && existing.endDate) {
            acc[history.movement] = history;
            return acc;
          }

          // Se ambos têm ou ambos não têm endDate, pega o mais recente
          const historyDate = new Date(history.endDate || history.startDate);
          const existingDate = new Date(existing.endDate || existing.startDate);

          if (historyDate > existingDate) {
            acc[history.movement] = history;
          }

          return acc;
        },
        {} as Record<string, InternshipProcessHistory>,
      ),
    );
  }

  async findInternshipProcessById(internshipProcessId: string) {
    return this.findInternshipProcessByIdUseCase.handle(internshipProcessId);
  }

  clear() {
    this.internshipProcessDetailsState.clear();
  }
}
