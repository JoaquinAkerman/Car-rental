import CarController from "../CarController";

describe("CarController", () => {
  let carController;
  let mockReq, mockRes;

  beforeEach(() => {
    const mockCarUpdateService = {
      createCar: jest.fn(),
    };
    const mockCarValidator = jest.fn();
    carController = new CarController(null, null, mockCarUpdateService, mockCarValidator);
    mockReq = {
      body: {
        brand: "Test Brand",
        model: "Test Model",
        day_price: 100,
        year: 2020,
        mileage: 10000,
        color: "red",
        air_conditioning: "Yes",
        transmission: "Automatic",
        panoramic_sunroof: "Yes",
      },
    };
    mockRes = {
      cookie: jest.fn(),
      redirect: jest.fn(),
    };
  });

  it("should create a car and redirect to the dashboard", async () => {
    await carController.createCar(mockReq, mockRes);
    expect(carController.CarValidator).toHaveBeenCalledWith(
      mockReq.body
    );
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