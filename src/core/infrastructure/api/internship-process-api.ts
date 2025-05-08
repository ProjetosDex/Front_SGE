import axiosBackEndClient from '../interceptors/axios-backend-client';
import type { InternshipProcess } from '@/core/domain/entities/internshipProcess.entity';

export class InternshipProcessApi {
  private controllerUrl = '/processo/estagio';

  async findById(id: string): Promise<InternshipProcess> {
    const response = await axiosBackEndClient.get(
      `${this.controllerUrl}/${id}`,
    );
    return response.data;
  }
}
