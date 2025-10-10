import axiosFileApiInstance from '../interceptors/axios-files-interceptor';

export class FileApi {
  private controllerUrl = '/file';

  async uploadTermCommitmentPdf(pfFormData: FormData): Promise<string> {
    const response = await axiosFileApiInstance.post(
      `${this.controllerUrl}/upload/term`,
      pfFormData,
    );

    const fileId = response.data;

    return fileId;
  }
}
