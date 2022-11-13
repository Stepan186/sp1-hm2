import { orderByType, paginationType } from '../blogs/blogs-query-repository';
import { IUserDb, UsersResponseInterface } from '../../utilities/interfaces/users/user-interface';
import { userColletion } from '../../db';
import { usersMapping } from '../../mapping/users-mapping';

export const usersQueryRepository = {
  findUsers: async (pagination: paginationType, orderBy: orderByType, searchLoginTerm: string | null, searchEmailTerm: string | null): Promise<UsersResponseInterface> => {

    let query = {$or: []}

    if (searchLoginTerm) {
      query.$or.push( { login:  {$regex: '^' + searchLoginTerm + '|' + '$' + searchLoginTerm, $options: 'i'} } as never);
    }

    if (searchEmailTerm) {
      query.$or.push( { email:  {$regex: '^' + searchEmailTerm + '|' + '$' + searchLoginTerm, $options: 'i'} } as never);
    }

    const users = await userColletion.find(query.$or.length? query : {}).skip(pagination.pageNumber * pagination.pageSize - pagination.pageSize)
      .limit(pagination.pageSize).sort({ [orderBy.sortBy]: orderBy.sortDirection }).toArray();
    const totalCount = await userColletion.countDocuments(query.$or.length? query : {});

    return usersMapping(users, pagination, totalCount);

  },

  findUserByLoginAndPas: async (hashPassword: string, login: string): Promise<boolean> => {
    const user = await userColletion.findOne({ password: hashPassword, login: login})
    return !!user;
  }
}
