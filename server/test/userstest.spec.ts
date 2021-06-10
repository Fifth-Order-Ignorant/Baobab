import { UserProfileInMemory } from '../src/dao/userprofiles';

describe('User tests', () => {
  it('should create a user', () => {
    const users = new UserProfileInMemory();

    users.addUserProfile(
      'Michael',
      'Sheinman Orenstrakh',
      'michael092001@gmail.com',
      '12345',
    );
    expect(users.getUserProfileCount() == 1);
  });

  it('should return a valid user given id', () => {
    const users = new UserProfileInMemory();
    const userID = users.addUserProfile(
      'Michael',
      'Sheinman Orenstrakh',
      'michael092001@gmail.com',
      '12345',
    );
    const user = users.getUserByID(userID);
    expect(user.email == 'michael092001@gmail.com');
  });

  it('should return a valid profile given id', () => {
    const users = new UserProfileInMemory();
    const userID = users.addUserProfile(
      'Michael',
      'Sheinman Orenstrakh',
      'michael092001@gmail.com',
      '12345',
    );
    const profile = users.getProfileByID(userID);
    expect(profile.name == 'Michael Sheinman Orenstrakh');
  });
});
