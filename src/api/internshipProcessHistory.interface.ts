import type { FileEntity } from './file.entity';

export interface InternshipProcessHistory {
  id: string;
  startDate: string | null;
  endDate: string;
  status: string;
  movement: string;
  description: string;
  observacoes: string;
  fileId: string;
  files?: FileEntity[];
  idInternshipProcess: string;
}
