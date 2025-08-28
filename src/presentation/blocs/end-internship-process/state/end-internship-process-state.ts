import { EndInternshipProcessDataTableMapper } from '@/core/application/mappers/end-internship-process-data-table-mapper';
import type { InternshipProcess } from '@/core/domain/entities/internshipProcess.entity';
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import type { EndInternshipProcessState } from './end-internship-process-state-interface';
import type { EndInternshipProcessDataTableDto } from '@/core/application/dtos/end-internship-process-data-table-dto';

export const useEndInternshipProcessState = defineStore(
  'EndInternshipProcessState',
  () => {
    const state: EndInternshipProcessState = reactive(getInitialState());

    const setEligibleInternshipFinalizationProcesses = (
      internshipProcess: InternshipProcess[],
    ) => {
      const formattedProcess =
        EndInternshipProcessDataTableMapper.toDataTable(internshipProcess);
      state.data = formattedProcess;
    };

    const setSelectedProcess = (
      endInternshipProcessDataTableDto: EndInternshipProcessDataTableDto[],
    ) => {
      state.selectedProcess = endInternshipProcessDataTableDto;
      console.log(state.selectedProcess);
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

    const clear = () => {
      Object.assign(state, getInitialState());
    };

    return {
      state,
      setSelectedProcess,
      setShowSuccessModal,
      setShowErrorModal,
      setMessageError,
      setLoading,
      setEligibleInternshipFinalizationProcesses,
      clear,
    };
  },
);

function getInitialState(): EndInternshipProcessState {
  return {
    headers: [
      {
        title: 'Concedente',
        align: 'start',
        key: 'termCommitment.grantingCompanyName',
      },
      { title: 'Movimentação', align: 'end', key: 'movement' },
      { title: 'Inicio Processo', align: 'end', key: 'startDateProcess' },
      { title: 'Status', align: 'end', key: 'status' },
      { title: 'Detalhes', align: 'center', value: 'actions' },
    ],
    data: [],
    selectedProcess: [],
    showSuccessModal: false,
    showErrorModal: false,
    messageError: null,
    loading: false,
  };
}
