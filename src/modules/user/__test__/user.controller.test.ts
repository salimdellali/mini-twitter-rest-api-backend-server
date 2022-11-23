import supertest, { Response } from 'supertest';
import UserService from '../user.service';
import { app } from '../../..';

const userCreationServicePayload = {
  success: true,
  message: 'Account created succesfully',
};

const userCreationServiceErrorPayload = {
  success: false,
  message: 'User with such username already exists',
};

const signupInput = {
  username: 'salim',
  password: '123',
};

beforeEach(() => {});

afterEach(() => {});

describe('user controller', () => {
  describe('user signup route', () => {
    describe("given the user doesn't exist", () => {
      it('should return a 201', async () => {
        const userServiceMock = jest
          .spyOn(UserService, 'signup')
          // @ts-ignore
          .mockReturnValueOnce(userCreationServicePayload);

        const { statusCode, body, headers } = await supertest(app)
          .post('/api/v1/user/signup')
          .send(signupInput)
          .set('Accept', 'application/json');

        expect(headers['content-type']).toEqual(
          'application/json; charset=utf-8',
        );
        expect(statusCode).toBe(201);
        expect(userServiceMock).toHaveBeenCalledWith('salim', '123');
        expect(body).toEqual(userCreationServicePayload);
      });
    });
  });
});
