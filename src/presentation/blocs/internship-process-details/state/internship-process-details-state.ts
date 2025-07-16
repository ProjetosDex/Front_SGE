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

    const setSelectedStep = (stepIndex: string) => {
      const step = state.steps.find((step) => step.index === stepIndex);
      if (step) {
        state.selectedStep = step.index;
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
        additionalInfo: 'Esse step é op começo de tudo meu nobre',
        index: Step.INTERNSHIP_START,
        editable: true,
        editIcon: 'mdi-file-document',
        documents: [],
      },
      {
        title: 'Fim de Estágio',
        index: Step.INTERNSHIP_END,
        editIcon: 'mdi-file-document',
        documents: [],
      },
    ],
    currentStep: Step.INTERNSHIP_START,
    selectedStep: Step.INTERNSHIP_START,
  };
}
