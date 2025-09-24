import { defineStore } from 'pinia';
import { reactive } from 'vue';
import {
  MovementToStepTranslation,
  Step,
  type StepState,
} from './internship-process-details-state-interface';
import type { FileEntity } from '@/core/domain/entities/file.entity';
import type { InternshipProcessHistory } from '@/core/domain/entities/internshipProcessHistory.entity';
import type { InternshipProcessMovement } from '@/core/domain/entities/internshipProcess.entity';

export const useInternshipProcessDetailsState = defineStore(
  'InternshipProcessDetailsState',
  () => {
    const state: StepState = reactive(getInitialState());

    const setInternshipProcessId = (internshipProcessId: string) => {
      state.internshipProcessId = internshipProcessId;
    };

    const getInternshipProcessId = (): string | undefined => {
      return state.internshipProcessId;
    };

    const setDocumentsInStep = (documents: FileEntity[], stepIndex: string) => {
      const step = state.steps.find((step) => step.index === stepIndex);
      if (step) {
        step.documents = documents;
      }
    };

    const setCurrentStep = (stepIndex: string) => {
      const step = state.steps.find((step) => step.index === stepIndex);
      if (step) {
        state.currentStep = step.index;
      }
    };

    const setSelectedStep = (stepIndex: Step) => {
      const step = state.steps.find((step) => step.index === stepIndex);
      if (step) {
        state.selectedStep = step.index;
        if (step.index === Step.INTERNSHIP_END) {
          step.editable = true;
        }
      }
    };

    const setStepData = (
      internshipProcessHistories: InternshipProcessHistory[],
    ) => {
      state.steps.forEach((step) => {
        const history = internshipProcessHistories.find(
          (history: InternshipProcessHistory) =>
            MovementToStepTranslation[
              history.movement as InternshipProcessMovement
            ] === step.index,
        );
        if (history) {
          step.status = history.status;
          step.description = history.description;
          step.rejectionReason = history.observations;
          step.documents.splice(
            0,
            step.documents.length,
            ...(history.files || []),
          );
        }
      });

      // Restaurar valores iniciais do step Fim de Estágio caso não tenha sido atualizado
      const endStepIndex = Step.INTERNSHIP_END;
      const endStep = state.steps.find((step) => step.index === endStepIndex);
      const hasEndStepHistory = internshipProcessHistories.some(
        (history) =>
          MovementToStepTranslation[
            history.movement as InternshipProcessMovement
          ] === endStepIndex,
      );
      if (endStep && !hasEndStepHistory) {
        const initialEndStep = getInitialState().steps.find(
          (step) => step.index === endStepIndex,
        );
        if (initialEndStep) {
          endStep.status = initialEndStep.status;
          endStep.description = initialEndStep.description;
          endStep.rejectionReason = initialEndStep.rejectionReason;
          endStep.documents = [...initialEndStep.documents];
          endStep.editable = initialEndStep.editable;
          endStep.editIcon = initialEndStep.editIcon;
          endStep.title = initialEndStep.title;
          endStep.additionalInfo = initialEndStep.additionalInfo;
        }
      }
    };

    const setMessageSuccessModal = (message: string) => {
      state.successMessage = message;
    };

    const setShowSuccessModal = (showModal: boolean) => {
      state.showSuccessModal = showModal;
    };

    const setShowErrorModal = (showModal: boolean) => {
      state.showErrorModal = showModal;
    };

    const setMessageError = (message: string) => {
      state.messageError = message;
    };

    const setLoading = (loading: boolean) => {
      state.loading = loading;
    };

    const getDocumentsInStep = (stepIndex: string): FileEntity[] => {
      const step = state.steps.find((step) => step.index === stepIndex);
      return step ? step.documents : [];
    };

    const clear = () => {
      Object.assign(state, getInitialState());
    };

    return {
      state,
      setInternshipProcessId,
      getInternshipProcessId,
      setDocumentsInStep,
      getDocumentsInStep,
      setCurrentStep,
      setSelectedStep,
      setStepData,
      setMessageSuccessModal,
      setShowSuccessModal,
      setShowErrorModal,
      setMessageError,
      setLoading,
      clear,
    };
  },
);

function getInitialState(): StepState {
  return {
    steps: [
      {
        title: 'Início de Estágio',
        status: 'Em andamento',
        additionalInfo:
          'Este é o primeiro estágio do processo de estágio. Ao concluir esta etapa, seu estágio estará em vigor.',
        index: Step.INTERNSHIP_START,
        editable: true,
        editIcon: 'mdi-file-document',
        documents: [],
      },
      {
        title: 'Fim de Estágio',
        additionalInfo:
          'Este é o último estágio do processo de estágio. Ao concluir esta etapa, seu estágio será finalizado.',
        index: Step.INTERNSHIP_END,
        editIcon: 'mdi-file-document',
        documents: [],
      },
    ],
    currentStep: Step.INTERNSHIP_START,
    selectedStep: Step.INTERNSHIP_START,
    loading: false,
    showSuccessModal: false,
    showErrorModal: false,
    successMessage: null,
    messageError: null,
  };
}
