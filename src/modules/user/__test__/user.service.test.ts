import UserService from '../user.service';

jest.mock('../user.repository');

const signupPayload = {
  success: true,
  message: 'Account created successfully',
};

describe.only('user service', () => {
  describe('user sign up', () => {
    describe('given username and password', () => {
      it('should return success true and account created successfully message', async () => {
        const result = await UserService.signup('salim', '123');
        expect(result).toEqual(signupPayload);
      });
    });
  });
});
