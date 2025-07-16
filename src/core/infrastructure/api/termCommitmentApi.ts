import type { CreateTermCommitmentDTO } from '@/core/application/dtos/createTermCommitmentDto';
import axiosBackEndClient from '../interceptors/axios-backend-client';
import type { AssignTermCommitmentDTO } from '@/core/application/dtos/assign-term-commitment-dto';

export class TermCommitmentApi {
  private controllerUrl = '/termCommitment';

  async createTermCommitment(createTermCommitmentDTO: CreateTermCommitmentDTO) {
    return axiosBackEndClient.post(
      `${this.controllerUrl}/create`,
      createTermCommitmentDTO,
    );
  }

  async assignTermCommitment(assignTermCommitmentDTO: AssignTermCommitmentDTO) {
    const formData = new FormData();
    formData.append(
      'internshipProcessId',
      assignTermCommitmentDTO.internshipProcessId,
    );

    if (assignTermCommitmentDTO.file) {
      formData.append('file', assignTermCommitmentDTO.file);
    }

    if (assignTermCommitmentDTO.remark && !assignTermCommitmentDTO.validate) {
      formData.append('remark', assignTermCommitmentDTO.remark);
      formData.append('validate', 'false');
    }

    if (assignTermCommitmentDTO.validate) {
      formData.append('validate', 'true');
    }

    await axiosBackEndClient.post(`${this.controllerUrl}/assign`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
