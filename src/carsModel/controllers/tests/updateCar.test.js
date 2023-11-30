import CarController from "../CarController";

describe("CarController", () => {
  let carController;
  let mockReq, mockRes;

  beforeEach(() => {
    const mockCarUpdateService = {
      updateCar: jest.fn(),
    };
    const mockCarValidator = jest.fn();
    carController = new CarController(null, null, mockCarUpdateService, mockCarValidator);
    mockReq = {
      params: {
        id: "1",
      },
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

  it("should update a car and redirect to the dashboard", async () => {
    await carController.updateCar(mockReq, mockRes);
    expect(carController.CarValidator).toHaveBeenCalledWith(
      mockReq.body
    );
    expect(carController.CarUpdateService.updateCar).toHaveBeenCalledWith(
      mockReq.params.id,
      mockReq.body
    );
    expect(mockRes.cookie).toHaveBeenCalledWith(
      "message",
      "Car updated successfully"
    );
    expect(mockRes.redirect).toHaveBeenCalledWith("/admin/dashboard");
  });

  it("should handle errors and redirect to the dashboard", async () => {
    carController.CarUpdateService.updateCar.mockImplementationOnce(() => {
      throw new Error();
    });
    await carController.updateCar(mockReq, mockRes);
    expect(mockRes.cookie).toHaveBeenCalledWith(
      "message",
      "Internal server error"
    );
    expect(mockRes.redirect).toHaveBeenCalledWith("/admin/dashboard");
  });
});