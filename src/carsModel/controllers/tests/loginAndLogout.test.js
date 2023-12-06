import CarController from "../CarController.js";

describe('CarController login and logout', () => {
  
    test('should render the login view', () => {
      const req = { cookies: { message: 'Test message' }, session: { admin: true } };
      const res = { clearCookie: jest.fn(), render: jest.fn() };
  
      const carController = new CarController();
      carController.renderLoginView(req, res);
  
      expect(res.clearCookie).toHaveBeenCalledWith('message');
      expect(res.render).toHaveBeenCalledWith('login', { message: 'Test message', loggedIn: true });
    });
  
    test('should handle logout', () => {
      const req = { session: { destroy: jest.fn() } };
      const res = { clearCookie: jest.fn(), redirect: jest.fn() };
  
      const carController = new CarController();
      carController.logout(req, res);
  
      expect(req.session.destroy).toHaveBeenCalled();
      req.session.destroy.mock.calls[0][0](); // call the callback passed to destroy
      expect(res.clearCookie).toHaveBeenCalledWith('sid');
      expect(res.redirect).toHaveBeenCalledWith('/');
    });
  });