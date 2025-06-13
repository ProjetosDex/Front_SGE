import type {
  InternshipProcessDataTable,
  InternshipProcessRegisterData,
} from '@/presentation/types/internship-process-data-table-types';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useInternshipProcessDetailsState = defineStore(
  'InternshipProcessDataTableStore',
  () => {
    const state: InternshipProcessDataTable = reactive({
      headers: [
        {
          title: 'Aluno',
          align: 'center',
          key: 'student',
        },
        { title: 'Matrícula', align: 'center', key: 'registration' },
        { title: 'Concedente', align: 'center', key: 'internshipGrantor' },
        {
          title: 'Data Inicio',
          align: 'center',
          key: 'internshipProcessStartDate',
        },
        { title: 'Data Fim', align: 'center', key: 'internshipProcessEndDate' },
        { title: 'Movimentação', align: 'center', key: 'movement' },
        { title: 'Status', align: 'center', key: 'status' },
        { title: 'Curso', align: 'center', key: 'course' },
        { title: 'Detalhes', key: 'actions', align: 'center', sortable: false },
      ],
      data: [],
      filters: {
        startDateProcessRangeStart: null,
        startDateProcessRangeEnd: null,
        endDateProcessRangeStart: null,
        endDateProcessRangeEnd: null,
        movement: null,
        status: null,
        user: {
          name: null,
          cpf: null,
          registration: null,
          email: null,
          courseStudy: null,
          telephone: null,
        },
        internshipGrantor: {
          name: null,
          cnpj: null,
        },
        termCommitment: {
          startDateInitialSearchInterval: null,
          endDateInitialSearchInterval: null,
          startDateFinalSearchInterval: null,
          endDateFinalSearchInterval: null,
          isMandatory: null,
          courseStudy: null,
        },
        page: 0,
        perPage: 10,
      },
      searchValue: '',
    });

    const setData = (
      internshipProcessRegisters: InternshipProcessRegisterData[],
    ) => {
      state.data = internshipProcessRegisters;
    };

    const clear = () => {
      (Object.keys(state.filters) as (keyof typeof state.filters)[]).forEach(
        (key) => {
          const subObject = state.filters[key];
          if (subObject && typeof subObject === 'object') {
            Object.keys(subObject).forEach((subKey) => {
              (subObject as any)[subKey] = null;
            });
          } else {
            (state.filters as any)[key] = null;
          }
        },
      );
    };

    return {
      state,
      setData,
      clear,
    };
  },
);
