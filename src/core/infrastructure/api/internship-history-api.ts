import {
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '@/core/domain/entities/internshipProcess.entity';
import axiosBackEndClient from '../interceptors/axios-backend-client';

export class InternshipHistoryApi {
  private controllerUrl = '/internship-history';

  async registerFilePathIdInProcess(
    internshipProcessId: string,
    filePathId: string,
    fileType: string,
  ) {
    console.log('recebi o id do processo ' + internshipProcessId);
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
}
