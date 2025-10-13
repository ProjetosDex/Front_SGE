import type { InternshipProcess } from '@/core/domain/entities/internshipProcess.entity';
import {
  InternshipProcessMovementTranslations,
  InternshipProcessStatusTranslations,
} from '../utils/translate-map-record-constant';
import type { EndInternshipProcessDataTableDto } from '../dtos/end-internship-process-data-table-dto';

//ajustar tipagens dps
export class EndInternshipProcessDataTableMapper {
  static toDataTable(
    internshipProcess: InternshipProcess[],
  ): EndInternshipProcessDataTableDto[] {
    const formatDateToDDMMYYYY = (dateString: string) => {
      const date = new Date(dateString);

      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const year = date.getUTCFullYear();

      return `${day}/${month}/${year}`;
    };

    return internshipProcess.map((internshipProcess) => {
      return {
        id: internshipProcess.id,
        termCommitment: {
          grantingCompanyName:
            internshipProcess.termCommitment.grantingCompanyName,
        },
        movement:
          InternshipProcessMovementTranslations[
            internshipProcess.movement as keyof typeof InternshipProcessMovementTranslations
          ],
        startDateProcess: formatDateToDDMMYYYY(
          internshipProcess.termCommitment.internshipStartDate,
        ),
        status:
          InternshipProcessStatusTranslations[
            internshipProcess.status as keyof typeof InternshipProcessStatusTranslations
          ],
      };
    });
  }
}
