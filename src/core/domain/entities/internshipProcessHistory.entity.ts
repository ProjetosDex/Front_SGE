import type { FileEntity } from './file.entity';

export interface InternshipProcessHistory {
  id: string;
  startDate: string;
  endDate: string | null;
  status: string;
  movement: string;
  description: string;
  observations: string;
  fileId: string;
  files?: FileEntity[];
  additionalInfo?: string;
  idInternshipProcess: string;
  createdAt: string;
}
