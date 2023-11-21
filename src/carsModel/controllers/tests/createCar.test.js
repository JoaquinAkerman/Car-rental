import CarController from "../CarController";

describe("CarController", () => {
  let carController;
  let mockReq, mockRes;

  beforeEach(() => {
    const mockCarUpdateService = {
      createCar: jest.fn(),
    };
    carController = new CarController(null, null, mockCarUpdateService);
    mockReq = {
      body: { brand: "Test Brand", model: "Test Model", day_price: 100 },
    };
    mockRes = {
      cookie: jest.fn(),
      redirect: jest.fn(),
    };
  });

  it("should create a car and redirect to the dashboard", async () => {
    await carController.createCar(mockReq, mockRes);
    expect(carController.CarUpdateService.createCar).toHaveBeenCalledWith(
      mockReq.body
    );
    expect(mockRes.cookie).toHaveBeenCalledWith(
      "message",
      "Car saved successfully",
      expect.any(Object)
    );
    expect(mockRes.redirect).toHaveBeenCalledWith("/admin/dashboard");
  });

  it("should handle errors and redirect to the dashboard", async () => {
    carController.CarUpdateService.createCar.mockImplementationOnce(() => {
      throw new Error();
    });
    await carController.createCar(mockReq, mockRes);
    expect(mockRes.cookie).toHaveBeenCalledWith(
      "message",
      expect.stringContaining("Internal server error"),
      expect.any(Object)
    );
    expect(mockRes.redirect).toHaveBeenCalledWith("/admin/dashboard");
  });
});
