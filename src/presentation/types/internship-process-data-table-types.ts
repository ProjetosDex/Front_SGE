import type { InternshipProcessFilterDto } from '@/core/application/dtos/internship-process-filter-dto';

export type InternshipProcessRegisterData = {
  id: string;
  student: string;
  academicRegistrationCode: string;
  internshipGrantor: string;
  internshipProcessStartDate: string;
  internshipProcessEndDate: string;
  movement: string;
  status: string;
  course: string;
};

export type InternshipProcessDataTableHeaders = {
  title: string;
  align: 'start' | 'end' | 'center' | undefined;
  key: string;
};

export type InternshipProcessDataTable = {
  headers: InternshipProcessDataTableHeaders[];
  data: InternshipProcessRegisterData[];
  filters: InternshipProcessFilterDto;
  searchValue: string;
};

export interface InternshipProcessDataTableState {
  state: InternshipProcessDataTable;
  clearFilters: () => void;
  setData: (
    internshipProcessRegisters: InternshipProcessRegisterData[],
  ) => void;
}
