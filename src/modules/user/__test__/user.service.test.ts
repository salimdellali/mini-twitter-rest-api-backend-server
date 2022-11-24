import UserService from '../user.service';

jest.mock('../user.repository');

const signupPayload = {
  success: true,
  message: 'Account created succesfully',
};

describe.only('user service', () => {
  describe('user sign up', () => {
    describe('given username and password', () => {
      it('should return success true and account created succesfully message', async () => {
        const result = await UserService.signup('salim', '123');
        expect(result).toEqual(signupPayload);
      });
    });
  });
});
