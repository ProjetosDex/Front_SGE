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

  async loadInternshipProcessDetails(userRole: string | null) {
    const internshipProcessId = this.router.currentRoute.value.params
      .id as string;
    if (internshipProcessId) {
      const internShipProcessHistoryData =
        await this.getHistoriesByInternshipProcessIdUseCase.handle(
          internshipProcessId,
        );
      this.loadHistoryDataInSteps(internShipProcessHistoryData, userRole);
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
    userRole: string | null,
  ) {
    let latestHistories = this.getLatestProcessHistory(
      internshipProcessHistories,
    );

    latestHistories = this.getDescription(latestHistories);

    latestHistories = this.setDynamicAdditionalInfo(latestHistories, userRole);

    const currentHistory = this.getCurrentHistory(latestHistories);
    const currentStep =
      MovementToStepTranslation[
        currentHistory?.movement as InternshipProcessMovement
      ];
    this.internshipProcessDetailsState.setCurrentStep(currentStep);
    this.internshipProcessDetailsState.setSelectedStep(currentStep);
    this.internshipProcessDetailsState.setStepData(latestHistories);
  }

  async rejectTermCommitment(rejectionReason: string, userRole: string | null) {
    await this.assignTermCommitmentUseCase.handle({
      internshipProcessId: this.router.currentRoute.value.params.id as string,
      remark: rejectionReason,
      validate: false,
    });

    await this.loadInternshipProcessDetails(userRole);
  }

  setDynamicAdditionalInfo(
    latestHistories: InternshipProcessHistory[],
    userRole: string | null,
  ): InternshipProcessHistory[] {
    if (userRole === UserRole.STUDENT) {
      return this.getAdditionalInfoForStudent(latestHistories);
    }

    if (userRole === UserRole.EMPLOYEE || userRole === UserRole.ADMINISTRATOR) {
      return this.getAdditionalInfoForEmployee(latestHistories);
    }

    return latestHistories;
  }

  getAdditionalInfoForStudent(latestHistories: InternshipProcessHistory[]) {
    return latestHistories.map((history) => {
      if (
        history.movement === InternshipProcessMovement.STAGE_START &&
        history.status === InternshipProcessStatus.IN_PROGRESS
      ) {
        return {
          ...history,
          additionalInfo:
            'Seu Termo de Compromisso foi gerado. O próximo passo é:\n 1. Fazer o download do documento.\n 2. Assinar e coletar a assinatura da empresa/instituição concedente.\n 3. Fazer o upload do termo assinado nesta mesma tela.',
        };
      }

      if (
        history.movement === InternshipProcessMovement.STAGE_START &&
        history.status === InternshipProcessStatus.UNDER_REVIEW
      ) {
        return {
          ...history,
          additionalInfo:
            'Seu Termo de Compromisso foi enviado e está em análise pelo setor de estágios. Você receberá uma notificação assim que o processo for concluído. Por favor, aguarde.',
        };
      }

      if (
        history.movement === InternshipProcessMovement.STAGE_START &&
        history.status === InternshipProcessStatus.REJECTED
      ) {
        return {
          ...history,
          additionalInfo:
            'Seu Termo de Compromisso foi recusado. Verifique o motivo da recusa. Siga os passos:\n 1. Corrija as informações necessárias.\n 2. Gere um novo documento.\n 3. Faça o upload do novo termo com as devidas assinaturas.',
        };
      }

      if (
        history.movement === InternshipProcessMovement.STAGE_START &&
        history.status === InternshipProcessStatus.COMPLETED
      ) {
        return {
          ...history,
          additionalInfo:
            'Parabéns! Seu Termo de Compromisso foi aprovado e seu estágio está oficialmente ativo.',
        };
      }

      if (
        history.movement === InternshipProcessMovement.STAGE_END &&
        history.status === InternshipProcessStatus.UNDER_REVIEW
      ) {
        return {
          ...history,
          additionalInfo:
            'Os documentos de finalização do estágio foram enviados e estão em análise pelo setor responsável. Você será notificado sobre a emissão do seu certificado de conclusão.',
        };
      }

      if (
        history.movement === InternshipProcessMovement.STAGE_END &&
        history.status === InternshipProcessStatus.REJECTED
      ) {
        return {
          ...history,
          additionalInfo:
            'Houve um problema com seus documentos de finalização.  Por favor, verifique o motivo da recusa e reenvie os arquivos corrigidos.',
        };
      }

      if (
        history.movement === InternshipProcessMovement.STAGE_END &&
        history.status === InternshipProcessStatus.COMPLETED
      ) {
        return {
          ...history,
          additionalInfo:
            'Processo finalizado com sucesso! Seu Certificado de Conclusão de Estágio está disponível para download.',
        };
      }

      return history;
    });
  }

  getDescription(latestHistories: InternshipProcessHistory[]) {
    return latestHistories.map((history) => {
      let description = '';
      if (history.movement === InternshipProcessMovement.STAGE_START) {
        description =
          'Esta etapa refere-se ao início do estágio, incluindo a geração e assinatura do termo de compromisso.';
      } else if (history.movement === InternshipProcessMovement.STAGE_END) {
        description =
          'Esta etapa refere-se à conclusão do estágio, incluindo o envio e validação do certificado de conclusão.';
      }
      return {
        ...history,
        description,
      };
    });
  }

  getAdditionalInfoForEmployee(latestHistories: InternshipProcessHistory[]) {
    return latestHistories.map((history) => {
      if (
        history.movement === InternshipProcessMovement.STAGE_START &&
        history.status === InternshipProcessStatus.IN_PROGRESS
      ) {
        return {
          ...history,
          additionalInfo:
            'O aluno gerou o Termo de Compromisso. Aguarde o envio do documento assinado para iniciar a análise.',
        };
      }

      if (
        history.movement === InternshipProcessMovement.STAGE_START &&
        history.status === InternshipProcessStatus.UNDER_REVIEW
      ) {
        return {
          ...history,
          additionalInfo:
            'O aluno enviou o Termo de Compromisso para análise. Sua ação é necessária: faça o download, verifique as informações e, se estiver tudo correto, assine e faça o upload do documento para aprovação.',
        };
      }

      if (
        history.movement === InternshipProcessMovement.STAGE_START &&
        history.status === InternshipProcessStatus.REJECTED
      ) {
        return {
          ...history,
          additionalInfo:
            'O Termo de Compromisso foi devolvido ao aluno para correção. Aguarde o reenvio do documento para uma nova análise.',
        };
      }

      if (
        history.movement === InternshipProcessMovement.STAGE_START &&
        history.status === InternshipProcessStatus.COMPLETED
      ) {
        return {
          ...history,
          additionalInfo:
            'Termo de Compromisso aprovado com sucesso. O estágio do aluno foi oficialmente iniciado no sistema.',
        };
      }

      if (
        history.movement === InternshipProcessMovement.STAGE_END &&
        history.status === InternshipProcessStatus.UNDER_REVIEW
      ) {
        return {
          ...history,
          additionalInfo:
            'O aluno enviou os documentos para finalizar o estágio. Faça o download para análise e, se estiverem corretos, realize o envio do certificado de conclusão.',
        };
      }

      if (
        history.movement === InternshipProcessMovement.STAGE_END &&
        history.status === InternshipProcessStatus.REJECTED
      ) {
        return {
          ...history,
          additionalInfo:
            'Os documentos de finalização foram devolvidos ao aluno para correção. Aguarde um novo envio para prosseguir com a análise.',
        };
      }

      if (
        history.movement === InternshipProcessMovement.STAGE_END &&
        history.status === InternshipProcessStatus.COMPLETED
      ) {
        return {
          ...history,
          additionalInfo:
            'Processo de estágio finalizado com sucesso. O certificado de conclusão foi emitido para o aluno.',
        };
      }

      return history;
    });
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
      if (!fileName.includes('TermoCompromisso')) {
        throw new Error('O nome do arquivo deve conter "TermoCompromisso".');
      }
    }
  }

  async registerAssignEndInternshipProcess(
    validate: boolean,
    userRole: string | null,
    remark?: string,
    files?: File[],
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

      await this.loadInternshipProcessDetails(userRole);
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

    // Validação específica para estudante: deve enviar 3 arquivos PDF com nomes específicos
    if (userRole === UserRole.STUDENT) {
      const requiredFiles = [
        'AvaliacaoProfessorOrientador.pdf',
        'AvaliacaoConcedente.pdf',
        'AutoAvaliacaoEstagiario.pdf',
      ];
      if (!files || files.length !== 3) {
        throw new Error(
          'É obrigatório fazer o upload dos 3 arquivos PDF: AvaliacaoSupervisor.pdf, AvaliacaoConcedente.pdf e AutoAvaliacaoEstagiario.pdf.',
        );
      }
      // Verifica se cada arquivo obrigatório está presente (um de cada)
      for (const requiredName of requiredFiles) {
        if (!files.some((file) => file.name === requiredName)) {
          throw new Error(
            'É obrigatório fazer o upload dos 3 arquivos PDF: AvaliacaoSupervisor.pdf, AvaliacaoConcedente.pdf e AutoAvaliacaoEstagiario.pdf.',
          );
        }
      }
      return;
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

    const ongoing = internshipProcessHistories.find((h) => !h.endDate);
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
