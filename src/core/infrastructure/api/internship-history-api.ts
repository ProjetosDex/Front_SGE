import axiosBackEndClient from '../interceptors/axios-backend-client';

export class InternshipHistoryApi {
  private controllerUrl = '/internship-history';

  async registerFilePathIdInProcess(
    internshipProcessId: string,
    filePathId: string,
    fileType: string,
  ) {
    axiosBackEndClient.post(`${this.controllerUrl}/register`, {
      status: '',
      movement: '',
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
