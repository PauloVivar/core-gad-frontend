import { User } from '../../domain/User'
import { UserRepository } from '../../domain/UserRepository'

export function getUser(userRepository: UserRepository) {
  return async function (id: string): Promise<User> {
    return await userRepository.get(id)
  }
}
