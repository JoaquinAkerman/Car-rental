import AuthenticationService from '../AuthenticationService';

describe('AuthenticationService', () => {
  let authService;

  beforeEach(() => {
    authService = new AuthenticationService();
  });

  test('validateUser should return true for correct credentials', () => {
    const isValid = authService.validateUser('admin', 'admin');

    expect(isValid).toBe(true);
  });

  test('validateUser should return false for incorrect credentials', () => {
    const isValid = authService.validateUser('wrong', 'credentials');

    expect(isValid).toBe(false);
  });
});