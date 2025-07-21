import type { InternshipProcess } from '../entities/internshipProcess.entity';
import type { InternshipProcessFilterDto } from '@/core/application/dtos/internship-process-filter-dto';

export interface InternshipProcessRepositoryInterface {
  findById(id: string): Promise<InternshipProcess>;
  getPaginatedProcess(
    internshipProcessFilterDto: InternshipProcessFilterDto,
  ): Promise<InternshipProcess[]>;
  getEligibleToEndInternshipProcess(): Promise<InternshipProcess[]>;
  assignEndInternshipProcess(
    internshipProcessId: string,
    files: File[],
    validate?: boolean,
  ): Promise<void>;
}
