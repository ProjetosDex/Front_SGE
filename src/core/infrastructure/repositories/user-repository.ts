import type { UserRepositoryInterface } from '@/core/domain/repositories/user-repository-interface';
import type { UserApi } from '../api/user-api';
import type { User } from '@/core/domain/entities/user.entity';

export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly userApi: UserApi) {}

  async getUser(): Promise<User> {
    return this.userApi.getUser();
  }
}
