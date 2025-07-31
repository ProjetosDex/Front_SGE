import axiosBackEndClient from '../interceptors/axios-backend-client';
import type { InternshipProcess } from '@/core/domain/entities/internshipProcess.entity';
import type { InternshipProcessFilterDto } from '@/core/application/dtos/internship-process-filter-dto';

export class InternshipProcessApi {
  private controllerUrl = '/processo/estagio';

  async findById(id: string): Promise<InternshipProcess> {
    const response = await axiosBackEndClient.get(
      `${this.controllerUrl}/${id}`,
    );
    return response.data;
  }

  async getPaginatedProcess(
    internshipProcessFilterDto: InternshipProcessFilterDto,
  ): Promise<InternshipProcess[]> {
    const response = await axiosBackEndClient.post(
      `${this.controllerUrl}/filter`,
      internshipProcessFilterDto,
    );
    return response.data;
  }

  async getEligibleToEndInternshipProcess(): Promise<InternshipProcess[]> {
    const response = await axiosBackEndClient.get(
      `${this.controllerUrl}/elegible-for-completation`,
      {
        params: {
          page: 1,
          pageSize: 10,
        },
      },
    );

    return response.data;
  }

  async assignEndInternshipProcess(
    internshipProcessId: string,
    files?: File[],
    validate?: boolean,
    remark?: string,
  ) {
    const formData = new FormData();
    formData.append('internshipProcessId', internshipProcessId);

    if (validate) {
      formData.append('validate', 'true');
    }

    if (remark) {
      formData.append('remark', remark);
    }

    if (files && files.length > 0) {
      for (const file of files) {
        formData.append('file', file);
      }
    }

    await axiosBackEndClient.post(
      `${this.controllerUrl}/assign-end-internship-process`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }
}
