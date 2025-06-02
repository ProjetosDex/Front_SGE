import type { InternshipProcessDataTable } from '@/presentation/types/internship-process-data-table-types';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useInternshipProcessDataTableState = defineStore(
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
      data: [
        {
          id: '1',
          student: 'Rafael Silva do Nascimento',
          registration: '20190796872',
          internshipGrantor: 'Advocacia Geral da União',
          internshipProcessStartDate: '18/04/2001',
          internshipProcessEndDate: '18/04/2001',
          movement: 'Inicio de Estágio',
          status: 'Em Análise',
          course: 'Análise e desenvolvimento de sistemas',
          details: '123',
        },
        {
          id: '1',
          student: 'josé Silva do Nascimento',
          registration: '20190796871',
          internshipGrantor: 'Advocacia Geral da União',
          internshipProcessStartDate: '18/04/2002',
          internshipProcessEndDate: '18/04/2002',
          movement: 'Inicio de Estágio',
          status: 'Em Análise',
          course: 'Análise e desenvolvimento de sistemas',
          details: '123',
        },
      ],
      filters: {
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
        internshipProcess: {
          startDateInitialSearchInterval: null,
          endDateInitialSearchInterval: null,
          startDateFinalSearchInterval: null,
          endDateFinalSearchInterval: null,
          movement: null,
          status: null,
        },
        termCommitment: {
          startDateInitialSearchInterval: null,
          endDateInitialSearchInterval: null,
          startDateFinalSearchInterval: null,
          endDateFinalSearchInterval: null,
          isMandatory: null,
          courseStudy: null,
        },
      },
      searchValue: '',
      itemsPerPage: 10,
      currentPage: 1,
    });

    const clearFilters = () => {
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
      clearFilters,
    };
  },
);
