import { UserProfilesInMemory } from '../src/dao/userprofiles';

describe('User tests', () => {
  it('should create a user', () => {
    const users = new UserProfilesInMemory();

    users.addUserProfile(
      'Michael',
      'Sheinman Orenstrakh',
      'michael092001@gmail.com',
      '12345',
    );
    expect(users.getUserProfileCount() == 1);
  });

  it('should return a valid user given id', () => {
    const users = new UserProfilesInMemory();
    const userId = users.addUserProfile(
      'Michael',
      'Sheinman Orenstrakh',
      'michael092001@gmail.com',
      '12345',
    );
    const user = users.getUserById(userId);
    expect(user.email == 'michael092001@gmail.com');
  });

  it('should return a valid profile given id', () => {
    const users = new UserProfilesInMemory();
    const userId = users.addUserProfile(
      'Michael',
      'Sheinman Orenstrakh',
      'michael092001@gmail.com',
      '12345',
    );
    const profile = users.getProfileById(userId);
    expect(profile.name == 'Michael Sheinman Orenstrakh');
  });
});
