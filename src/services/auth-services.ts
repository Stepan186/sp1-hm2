import { LoginInterface } from '../utilities/interfaces/auth/login-interface';
import { hashData } from './password-services';
import { usersQueryRepository } from '../repositories/users/users-query-repository';

export const authServices = {
  login: async (data: LoginInterface): Promise<boolean> => {
    const hashPassword = await hashData(data.password)
    return await usersQueryRepository.findUserByLoginAndPas(hashPassword, data.login)
  }
}
