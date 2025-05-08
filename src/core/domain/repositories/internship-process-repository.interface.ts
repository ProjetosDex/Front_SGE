import type { InternshipProcess } from '../entities/internshipProcess.entity';

export interface InternshipProcessRepositoryInterface {
  findById(id: string): Promise<InternshipProcess>;
}
