import CarController from "../CarController";

describe("CarController", () => {
  let carController;
  let mockReq, mockRes, next;

  beforeEach(() => {
    carController = new CarController();
    mockReq = {
      session: {
        admin: false,
      },
    };
    mockRes = {
      redirect: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call next if the user is logged in", () => {
    mockReq.session.admin = true;
    carController.ensureLoggedIn(mockReq, mockRes, next);
    expect(next).toHaveBeenCalled();
    expect(mockRes.redirect).not.toHaveBeenCalled();
  });

  it("should redirect to the home page if the user is not logged in", () => {
    carController.ensureLoggedIn(mockReq, mockRes, next);
    expect(next).not.toHaveBeenCalled();
    expect(mockRes.redirect).toHaveBeenCalledWith("/");
  });
});