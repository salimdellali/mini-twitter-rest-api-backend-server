import supertest from 'supertest';
import UserService from '../user.service';
import { app } from '../../..';

// jest.mock('../user.repository');

const userCreationServicePayload = {
  success: true,
  message: 'Account created successfully',
};

const userCreationServiceErrorPayload = {
  success: false,
  message: 'User with such username already exists',
};

const signupInput = {
  username: 'hanane',
  password: '123',
};

// beforeAll(() => {
//   jest.setTimeout(50000);
// });

// afterAll(() => {
//   jest.restoreAllMocks();
// });

describe('user controller', () => {
  describe('user signup route', () => {
    describe('given the user provided an empty username', () => {
      it('should return a 400', async () => {
        const userServiceMock = jest
          .spyOn(UserService, 'signup')
          // @ts-ignore
          .mockReturnValueOnce(userCreationServicePayload);

        const { statusCode, body, headers } = await supertest(app)
          .post('/api/v1/user/signup')
          .send({ password: '123' })
          .set('Accept', 'application/json');

        expect(headers['content-type']).toEqual(
          'application/json; charset=utf-8',
        );
        expect(statusCode).toBe(400);
        expect(userServiceMock).not.toHaveBeenCalled();
        expect(body.success).toBeFalsy();
      });
    });

    describe('given the user provided an empty password', () => {
      it('should return a 400', async () => {
        const userServiceMock = jest
          .spyOn(UserService, 'signup')
          // @ts-ignore
          .mockReturnValueOnce(userCreationServicePayload);

        const { statusCode, body, headers } = await supertest(app)
          .post('/api/v1/user/signup')
          .send({ username: 'hanane' })
          .set('Accept', 'application/json');

        expect(headers['content-type']).toEqual(
          'application/json; charset=utf-8',
        );
        expect(statusCode).toBe(400);
        expect(userServiceMock).not.toHaveBeenCalled();
        expect(body.success).toBeFalsy();
      });
    });

    describe("given the user provided credentials in a valid format and the user doesn't exist", () => {
      it('should return a signup payload and 201', async () => {
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
        expect(userServiceMock).toHaveBeenCalledWith('hanane', '123');
        expect(body).toEqual(userCreationServicePayload);
      });
    });

    // @TODO implement test given the user exists and the user provided credentials in a valid format
    // describe('given the user exists and the user provided credentials in a valid format', () => {
    //   it('should return a 400', async () => {
    //     const userServiceMock = jest
    //       .spyOn(UserService, 'signup')
    //       // @ts-ignore
    //       .mockReturnValueOnce(userCreationServiceErrorPayload);

    //     const result = await UserService.signup('hanane', '123');
    //     const { statusCode, body, headers } = await supertest(app)
    //       .post('/api/v1/user/signup')
    //       .send(signupInput)
    //       .set('Accept', 'application/json');

    //     expect(headers['content-type']).toEqual(
    //       'application/json; charset=utf-8',
    //     );
    //     expect(statusCode).toBe(400);
    //     expect(userServiceMock).toHaveBeenCalledWith('hanane', '123');
    //     expect(body).toEqual(userCreationServiceErrorPayload);
    //   });
    // });
  });
});
