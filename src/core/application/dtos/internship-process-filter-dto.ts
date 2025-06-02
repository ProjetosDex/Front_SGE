import type { TermCommitmentFilterDto } from './term-commitment-filter-dto';
import type { UserFilterDto } from './user-filter-dto';

export interface InternshipProcessFilterDto {
  startDateProcessRangeStart: string | null;
  startDateProcessRangeEnd: string | null;
  endDateProcessRangeStart: string | null;
  endDateProcessRangeEnd: string | null;
  movement: string | null;
  status: string | null;

  user: UserFilterDto;

  internshipGrantor: {
    name: string | null;
    cnpj: string | null;
  };

  termCommitment: TermCommitmentFilterDto;

  page: number;
  perPage: number;
}
