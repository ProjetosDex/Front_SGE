import type { FileEntity } from './file.entity';

export interface InternshipProcessHistory {
  id: string;
  startDate: Date | null;
  endDate: Date;
  status: string;
  movement: string;
  description: string;
  observacoes: string;
  fileId: string;
  file?: FileEntity;
  idInternshipProcess: string;
}
