import express from "express";
import CarController from "../CarController.js";

describe("CarController.renderAdminView", () => {
  let carGetServiceMock;
  let carController;
  let app;

  beforeEach(() => {
    jest.resetAllMocks();
    carGetServiceMock = {
      getAllCars: jest.fn(),
    };
    carController = new CarController(carGetServiceMock);
    app = express();
    app.set("view engine", "njk");
  });

  it("should render the admin view with the cars and message", async () => {
    const mockCars = [{ id: 1, name: "Car 1" }, { id: 2, name: "Car 2" }];
    carGetServiceMock.getAllCars.mockResolvedValue(mockCars);
    const req = {
      cookies: {
        message: "Test message",
      },
    };
    const res = {
      clearCookie: jest.fn(),
      render: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await carController.renderAdminView(req, res);

    expect(carGetServiceMock.getAllCars).toHaveBeenCalled();
    expect(res.clearCookie).toHaveBeenCalledWith("message");
    expect(res.render).toHaveBeenCalledWith("admin/dashboard", {
      cars: mockCars,
      message: req.cookies.message,
    });
  });

  it("should handle errors from the getAllCars method", async () => {
    const mockError = new Error("Error getting cars");
    carGetServiceMock.getAllCars.mockRejectedValue(mockError);
    const req = {
      cookies: {
        message: "Test message",
      },
    };
    const res = {
      clearCookie: jest.fn(),
      render: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await carController.renderAdminView(req, res);

    expect(carGetServiceMock.getAllCars).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Internal server error");
  });
});