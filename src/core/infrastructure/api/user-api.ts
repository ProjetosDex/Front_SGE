import type { User } from '@/core/domain/entities/user.entity';
import axiosBackEndClient from '../interceptors/axios-backend-client';

export class UserApi {
  private controllerUrl = '/user';

  async getUser(): Promise<User> {
    const response = await axiosBackEndClient.get(
      `${this.controllerUrl}/profile`,
    );
    return response.data;
  }
}
