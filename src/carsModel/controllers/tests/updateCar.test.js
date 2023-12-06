import CarController from "../CarController";

describe("CarController", () => {
  test("should update a car and redirect to the dashboard", async () => {
    const id = "testId";
    const newCarData = {
      /* your car data here */
    };
    const req = { params: { id }, body: newCarData };
    const res = {
      cookie: jest.fn(),
      redirect: jest.fn(),
    };

    const carController = new CarController();
    carController.CarValidator = jest.fn();
    carController.CarUpdateService = {
      updateCar: jest.fn().mockResolvedValue(),
    };

    await carController.updateCar(req, res);

    expect(carController.CarValidator).toHaveBeenCalledWith(newCarData);
    expect(carController.CarUpdateService.updateCar).toHaveBeenCalledWith(
      id,
      newCarData
    );
    expect(res.cookie).toHaveBeenCalledWith(
      "message",
      "Car updated successfully"
    );
    expect(res.redirect).toHaveBeenCalledWith("/admin/dashboard");
  });

  test("should handle errors", async () => {
    const id = "testId";
    const newCarData = {
      /* your car data here */
    };
    const req = { params: { id }, body: newCarData };
    const res = {
      cookie: jest.fn(),
      redirect: jest.fn(),
    };

    const carController = new CarController();
    carController.CarValidator = jest.fn();
    carController.CarUpdateService = {
      updateCar: jest.fn().mockRejectedValue(new Error("Test error")),
    };

    await carController.updateCar(req, res);

    expect(res.cookie).toHaveBeenCalledWith("message", "Internal server error");
    expect(res.redirect).toHaveBeenCalledWith("/admin/dashboard");
  });
});
