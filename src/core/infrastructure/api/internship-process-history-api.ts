import {
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '@/core/domain/entities/internshipProcess.entity';
import axiosBackEndClient from '../interceptors/axios-backend-client';
import type { InternshipProcessHistory } from '@/core/domain/entities/internshipProcessHistory.entity';

export class InternshipProcessHistoryApi {
  private controllerUrl = '/internship-history';

  async registerFilePathIdInProcess(
    internshipProcessId: string,
    filePathId: string,
    fileType: string,
  ) {
    axiosBackEndClient.post(`${this.controllerUrl}/register`, {
      status: InternshipProcessStatus.IN_PROGRESS,
      movement: InternshipProcessMovement.STAGE_START,
      idInternshipProcess: internshipProcessId,
      files: [
        {
          fileId: filePathId,
          fileType,
        },
      ],
    });
  }

  async getInternshipHistoriesByInternshipProcessId(
    internshipProcessId: string,
  ): Promise<InternshipProcessHistory[]> {
    const response = await axiosBackEndClient.get<InternshipProcessHistory[]>(
      `${this.controllerUrl}/by-internship-process/${internshipProcessId}`,
    );

    return response.data;
  }
}
