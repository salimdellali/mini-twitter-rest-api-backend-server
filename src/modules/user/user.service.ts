export default class UserService {
  static signup = async (username: string, password: string) => {
    return {
      token: 'jwt_token',
      user: {
        username,
        lastAccess: '2022-11-21T22:36:44.223Z',
      },
    };
  };
}
