import type { FindInternshipProcessByIdUseCase } from '@/core/application/usecases/find-internship-process-by-id-usecase';
import type { Router } from 'vue-router';
import {
  MovementToStepTranslation,
  Step,
  type InternshipProcessDetailsStateInterface,
} from './state/internship-process-details-state-interface';
import type { GetHistoriesByInternshipProcessIdUseCase } from '@/core/application/usecases/get-histories-by-internship-process-id-usecase';
import type { InternshipProcessHistory } from '@/core/domain/entities/internshipProcessHistory.entity';
import {
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '@/core/domain/entities/internshipProcess.entity';
import type { AssignTermCommitmentUseCase } from '@/core/application/usecases/assign-term-commitment-usecase';
import { UserRole, type User } from '@/core/domain/entities/user.entity';
import { toRefs } from 'vue';
import type { AssignEndInternshipProcessUseCase } from '@/core/application/usecases/assign-end-internship-process-usecase';

export class InternshipProcessDetailsBloc {
  constructor(
    private readonly router: Router,
    private readonly internshipProcessDetailsState: InternshipProcessDetailsStateInterface,
    private readonly authState: any,
    private readonly findInternshipProcessByIdUseCase: FindInternshipProcessByIdUseCase,
    private readonly getHistoriesByInternshipProcessIdUseCase: GetHistoriesByInternshipProcessIdUseCase,
    private readonly assignTermCommitmentUseCase: AssignTermCommitmentUseCase,
    private readonly assignEndInternshipProcessUseCase: AssignEndInternshipProcessUseCase,
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
    return toRefs(this.internshipProcessDetailsState.state);
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

    await this.loadInternshipProcessDetails();
  }

  async registerAssignTermCommitment(files: File[], userRole?: string | null) {
    try {
      this.internshipProcessDetailsState.setLoading(true);
      const validate =
        userRole === UserRole.ADMINISTRATOR || userRole === UserRole.EMPLOYEE
          ? true
          : false;
      await this.validateTermCommitmentAssignFiles(files, userRole);
      await this.assignTermCommitmentUseCase.handle({
        internshipProcessId: this.router.currentRoute.value.params.id as string,
        file: files[0],
        validate,
      });

      this.internshipProcessDetailsState.setLoading(false);
      this.internshipProcessDetailsState.setMessageSuccessModal(
        'Termo de compromisso enviado com sucesso.',
      );
      this.internshipProcessDetailsState.setShowSuccessModal(true);
    } catch (error: any) {
      this.internshipProcessDetailsState.setLoading(false);
      this.internshipProcessDetailsState.setMessageError(error.message);
      this.internshipProcessDetailsState.setShowErrorModal(true);
    }
  }

  async validateTermCommitmentAssignFiles(
    files: File[],
    userRole?: string | null,
  ) {
    if (files[0]?.type !== 'application/pdf') {
      throw new Error('O arquivo deve ser um PDF.');
    }

    if (userRole === UserRole.STUDENT && files.length > 1) {
      throw new Error(
        'Estudante só pode enviar um arquivo para o termo de compromisso.',
      );
    }

    if (files.length === 0) {
      throw new Error('É necessário enviar o termo de compromisso.');
    }

    if (files.length > 1) {
      throw new Error('Só é permitido enviar um arquivo.');
    }

    if (files[0]?.name) {
      const fileName = files[0].name;
      console.log(fileName);
      if (!fileName.includes('TermoCompromisso')) {
        throw new Error('O nome do arquivo deve conter "TermoCompromisso".');
      }
    }
  }

  async registerAssignEndInternshipProcess(
    validate: boolean,
    remark?: string,
    files?: File[],
    userRole?: UserRole,
  ) {
    try {
      this.internshipProcessDetailsState.setLoading(true);
      await this.validateEndInternshipFiles(files, userRole, validate);
      await this.assignEndInternshipProcessUseCase.handle(
        this.router.currentRoute.value.params.id as string,
        files,
        validate,
        remark,
      );

      await this.loadInternshipProcessDetails();
    } catch (error: any) {
      this.internshipProcessDetailsState.setLoading(false);
      this.internshipProcessDetailsState.setMessageError(error.message);
      this.internshipProcessDetailsState.setShowErrorModal(true);
    }
  }

  async validateEndInternshipFiles(
    files?: File[],
    userRole?: string | null,
    validate?: boolean,
  ) {
    if (files && files.some((file) => file.type !== 'application/pdf')) {
      throw new Error('Todos os documentos devem estar em formato PDF.');
    }

    if (
      (userRole === UserRole.ADMINISTRATOR || userRole === UserRole.EMPLOYEE) &&
      validate &&
      files &&
      files?.length === 0
    ) {
      throw new Error(
        'É necessário o envio do atestado de estágio para aprovação da finalização do estágio.',
      );
    }

    if (files && files.length > 1) {
      throw new Error('Só é permitido enviar um arquivo (certificado_estagio)');
    }

    if (files && files[0]?.name) {
      const fileName = files[0].name;
      if (!fileName.includes('CertificadoConclusaoEstagio')) {
        throw new Error(
          'O nome do arquivo deve conter "CertificadoConclusaoEstagio".',
        );
      }
    }
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
    const latestByMovement = internshipProcessHistories.reduce(
      (acc, history) => {
        const existing = acc[history.movement];

        if (!existing) {
          acc[history.movement] = history;
          return acc;
        }

        const historyDate = new Date(history.createdAt);
        const existingDate = new Date(existing.createdAt);

        if (historyDate > existingDate) {
          acc[history.movement] = history;
        }

        return acc;
      },
      {} as Record<string, InternshipProcessHistory>,
    );

    Object.keys(latestByMovement).forEach((movement) => {
      const history = latestByMovement[movement];

      // NOVA REGRA: Se o status for REJECTED, marque os arquivos do underReview como rejeitados
      if (history.status === InternshipProcessStatus.REJECTED) {
        const underReviewHistory = internshipProcessHistories.find(
          (h) =>
            h.movement === movement &&
            h.status === InternshipProcessStatus.UNDER_REVIEW,
        );

        if (underReviewHistory?.files) {
          history.files = (underReviewHistory.files || []).map((file) => ({
            ...file,
            isRejected: true,
          }));
        }
      }

      // Regra já existente para COMPLETED
      if (history.status === InternshipProcessStatus.COMPLETED) {
        const underReviewHistory = internshipProcessHistories.find(
          (h) =>
            h.movement === movement &&
            h.status === InternshipProcessStatus.UNDER_REVIEW,
        );

        if (
          history.movement === InternshipProcessMovement.STAGE_START &&
          history.status === InternshipProcessStatus.COMPLETED
        ) {
          const endStageHistory =
            latestByMovement[InternshipProcessMovement.STAGE_END];
          if (endStageHistory) {
            endStageHistory.files = [
              ...(endStageHistory.files || []),
              ...(history.files || []),
            ];
          }
        }

        if (
          underReviewHistory?.movement ===
            InternshipProcessMovement.STAGE_END &&
          underReviewHistory.files
        ) {
          history.files = [
            ...(history.files || []),
            ...(underReviewHistory.files || []),
          ];
        }
      }
    });

    return Object.values(latestByMovement);
  }

  updateSelectedStep(stepIndex: Step) {
    this.internshipProcessDetailsState.setSelectedStep(stepIndex);
  }

  async findInternshipProcessById(internshipProcessId: string) {
    return this.findInternshipProcessByIdUseCase.handle(internshipProcessId);
  }

  clear() {
    this.internshipProcessDetailsState.clear();
  }
}
