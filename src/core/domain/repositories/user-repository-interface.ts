import type { User } from '../entities/user.entity';

export interface UserRepositoryInterface {
  getUser(): Promise<User>;
}
