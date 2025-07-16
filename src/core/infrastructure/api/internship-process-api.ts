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
      'processo/estagio/elegible-for-completation',
      {
        params: {
          page: 1,
          pageSize: 10,
        },
      },
    );

    return response.data;
  }
}
