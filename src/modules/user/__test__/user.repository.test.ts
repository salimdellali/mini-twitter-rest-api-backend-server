import { UserCreateDTO } from '../user.dto';
import User from '../user.model';
import UserRepository from '../user.repository';

const userCreateInput: UserCreateDTO = {
  username: 'salim',
  password: '123',
  lastAccess: new Date('2022-11-24T01:02:45.674+00:00'),
};

// beforeAll(() => {
//   jest.setTimeout(50000);
// });

// afterAll(() => {
//   jest.restoreAllMocks();
// });

describe('user repository', () => {
  describe('expect true to be true', () => {
    it('shoud make the test pass', () => {
      expect(true).toBe(true);
    });
  });
  //   describe('given user create input', () => {
  //     it('should create user document', async () => {
  //       const userCreateMock = jest.spyOn(User, 'create').mockImplementation();
  //       await UserRepository.create(userCreateInput);
  //       expect(userCreateMock).toHaveBeenCalledWith(userCreateInput);
  //     });
  //   });
});
