import type { User } from '@/core/domain/entities/user.entity';
import type { UserRepositoryInterface } from '@/core/domain/repositories/user-repository-interface';

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async handle(): Promise<User> {
    return this.userRepository.getUser();
  }
}
