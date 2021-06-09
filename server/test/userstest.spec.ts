import { UsersInMemory } from '../src/dao/users';

describe('User tests', () => {
  it('should create a user', () => {
    const users = new UsersInMemory();

    users.addUser(
      'Michael',
      'Sheinman Orenstrakh',
      'michael092001@gmail.com',
      '12345',
    );
    expect(users.getUserCount() == 1);
  });

  it('should return a valid user given id', () => {
    const users = new UsersInMemory();
    const userId = users.addUser(
      'Michael',
      'Sheinman Orenstrakh',
      'michael092001@gmail.com',
      '12345',
    );
    const user = users.getById(userId);
    expect(user.email == 'michael092001@gmail.com');
  });
});
