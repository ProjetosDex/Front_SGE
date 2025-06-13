import type { InternshipProcess } from '@/core/domain/entities/internshipProcess.entity';
import type { InternshipProcessRegisterData } from '@/presentation/types/internship-process-data-table-types';
import {
  InternshipProcessMovementTranslations,
  InternshipProcessStatusTranslations,
} from '../utils/translate-map-record-constant';

//ajustar tipagens dps
export class InternshipProcessDataTableMapper {
  static toDataTable(
    internshipProcess: InternshipProcess[],
  ): InternshipProcessRegisterData[] {
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
        registration: internshipProcess.user.registration,
        student: internshipProcess.user.name,
        internshipGrantor: internshipProcess.termCommitment.grantingCompanyName,
        internshipProcessStartDate: formatDateToDDMMYYYY(
          internshipProcess.termCommitment.internshipStartDate,
        ),
        internshipProcessEndDate: formatDateToDDMMYYYY(
          internshipProcess.termCommitment.internshipEndDate,
        ),
        movement:
          InternshipProcessMovementTranslations[internshipProcess.movement],
        status: InternshipProcessStatusTranslations[internshipProcess.status],
        course: internshipProcess.user.courseStudy,
      };
    });
  }
}
