import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import type { InternshipProcess } from '@/core/domain/entities/internshipProcess.entity';

interface Filtros {
  nameAluno: string | null;
  nomeConcedente: string | null;
  matriculaAluno: string | null;
  dataInicioEstagioRangeStart: string | null;
  dataInicioEstagioRangeEnd: string | null;
  dataFimestagioRangeStart: string | null;
  dataFimestagioRangeEnd: string | null;
  tipoEstagio: string | null;
  cursoAluno: string | null;
}

export const useDataTableStore = defineStore('dataTable', () => {
  const showItems = ref(10);
  const page = ref(1);
  const filtros = reactive<Filtros>({
    nameAluno: null,
    nomeConcedente: null,
    matriculaAluno: null,
    dataInicioEstagioRangeStart: null,
    dataInicioEstagioRangeEnd: null,
    dataFimestagioRangeStart: null,
    dataFimestagioRangeEnd: null,
    tipoEstagio: null,
    cursoAluno: null,
  });

  const internshipProcessRegisters = ref<InternshipProcess[]>([]);

  const atualizarFiltros = (novosFiltros: any) => {
    Object.assign(filtros, novosFiltros);
  };

  const atualizarInternshipProcessRegisters = (
    registros: InternshipProcess[],
  ) => {
    internshipProcessRegisters.value = [...registros];
  };

  return {
    showItems,
    page,
    filtros,
    internshipProcessRegisters,
    atualizarFiltros,
    atualizarInternshipProcessRegisters,
  };
});
