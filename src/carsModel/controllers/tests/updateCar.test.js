/**
 * @jest-environment node
 */

import CarController from "../CarController";

describe("CarController", () => {
  test("should update car and redirect to /admin/dashboard on success", async () => {
    const id = 1;
    const newCarData = {};
    const updateCarMock = jest.fn().mockResolvedValue({});
    const req = {
      params: { id },
      body: newCarData,
    };
    const res = {
      cookie: jest.fn(),
      redirect: jest.fn(),
    };
    const carUpdateServiceMock = {
      updateCar: updateCarMock,
    };
    const carController = new CarController(null, null, carUpdateServiceMock); // Act

    await carController.updateCar(req, res); // Assert

    expect(updateCarMock).toHaveBeenCalledWith(id, newCarData);
    expect(res.cookie).toHaveBeenCalledWith(
      "message",
      "Car updated successfully"
    );
    expect(res.redirect).toHaveBeenCalledWith("/admin/dashboard");
  });

  test("should handle error and redirect to /admin/dashboard on failure", async () => {
    // Arrange
    const id = 1;
    const newCarData = {
      /* mock new car data */
    };
    const error = new Error("Some error");
    const updateCarMock = jest.fn().mockRejectedValue(error);
    const req = {
      params: { id },
      body: newCarData,
    };
    const res = {
      cookie: jest.fn(),
      redirect: jest.fn(),
    };
    const carUpdateServiceMock = {
      updateCar: updateCarMock,
    };
    const carController = new CarController(null, null, carUpdateServiceMock); // Act

    await carController.updateCar(req, res); // Assert

    expect(updateCarMock).toHaveBeenCalledWith(id, newCarData);
    expect(res.cookie).toHaveBeenCalledWith("message", "Internal server error");
    expect(res.redirect).toHaveBeenCalledWith("/admin/dashboard");
  });
});
