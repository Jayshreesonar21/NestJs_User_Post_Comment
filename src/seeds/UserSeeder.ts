import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../modules/user/entities/user.entity';
import { UserRole } from '../modules/user/role.enum';

export class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);

    const userData = {
      username: 'admin',
      email: 'admin@gmail.com',
      password: '12345678',
      role: UserRole.ADMIN,
    };

    const newUser = userRepository.create(userData);
    await userRepository.save(newUser);
  }
}
