import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {
    // Complete usando ORM
    return this.repository.findOne({
      relations: ['games'],
      where: {id: user_id}
    });
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query('SELECT users.* ' 
                                  + 'FROM USERS users '
                                  + 'ORDER BY users.first_name ASC'); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(`SELECT u.*
                                    FROM USERS u
                                    WHERE u.first_name || ' ' || u.last_name
                                      ILIKE '${first_name + ' ' + last_name}'`); // Complete usando raw query
  }
}
