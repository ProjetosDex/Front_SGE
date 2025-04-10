import type { FileEntity } from './file.entity';

export interface InternshipProcessHistory {
  id: string;
  startDate: string | null;
  endDate: string;
  status: string;
  movement: string;
  description: string;
  observations: string;
  fileId: string;
  files?: FileEntity[];
  idInternshipProcess: string;
}
