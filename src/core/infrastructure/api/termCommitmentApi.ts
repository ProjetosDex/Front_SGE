import type { CreateTermCommitmentDTO } from '@/core/application/dtos/createTermCommitmentDto';
import axiosBackEndClient from '../interceptors/axios-backend-client';

export class TermCommitmentApi {
  private controllerUrl = '/termCommitment';

  async createTermCommitment(createTermCommitmentDTO: CreateTermCommitmentDTO) {
    return axiosBackEndClient.post(
      `${this.controllerUrl}/create`,
      createTermCommitmentDTO,
    );
  }
}
