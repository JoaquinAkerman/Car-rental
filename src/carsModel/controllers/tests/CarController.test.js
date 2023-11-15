import express from "express";
import CarController from "../CarController.js";
import supertest from "supertest";
import expressNunjucks from "express-nunjucks";

describe("CarController", () => {
  let carGetServiceMock;
  let carController;
  let app;

  beforeEach(() => {
    carGetServiceMock = {
      getAllCars: jest.fn(),
    };
    carController = new CarController(carGetServiceMock);
    app = express();
    app.set("view engine", "njk");
    const isDev = app.get("env") === "development";
    expressNunjucks(app, { watch: isDev, noCache: isDev });
    carController.registerRoutes(app);
  });

  it("should render cars view", async () => {
    const mockCars = [
      {
        id: 1,
        brand: "Test Brand",
        model: "Test Model 1",
        year: "Test Year",
        mileage: "Test Mileage",
        color: "Test Color",
        air_conditioning: "Test AC",
        passengers: "Test Passengers",
        transmission: "Test Transmission",
        panoramic_sunroof: "Test Sunroof",
      },

      { id: 2, brand: "Car 2", model: "Model 2", year: 2021 },
    ];

    carGetServiceMock.getAllCars.mockResolvedValue(mockCars);

    const response = await supertest(app).get("/cars");

    expect(response.status).toBe(200);
    expect(response.text).toContain(
      `strong>Brand:</strong> ${mockCars[0].brand}<br>`
    );
    expect(response.text).toContain(
      `strong>Model:</strong> ${mockCars[0].model}<br>`
    );
    expect(response.text).toContain(
      `<strong>Year:</strong> ${mockCars[0].year}<br>`
    );
    expect(response.text).toContain(
      `<strong>Mileage:</strong> ${mockCars[0].mileage}<br>`
    );
    expect(response.text).toContain(
      `<strong>Colors:</strong> ${mockCars[0].color}<br>`
    );
    expect(response.text).toContain(
      `<strong>Air conditioning:</strong> ${mockCars[0].air_conditioning}<br>`
    );
    expect(response.text).toContain(
      `<strong>Passengers:</strong> ${mockCars[0].passengers}<br>`
    );
    expect(response.text).toContain(
      `<strong>Transmission:</strong> ${mockCars[0].transmission}<br>`
    );
    expect(response.text).toContain(
      `<strong>Panoramic sunroof:</strong> ${mockCars[0].panoramic_sunroof}<br>`
    );
  });

  it("should return 500 if there is a problem getting cars", async () => {
    carGetServiceMock.getAllCars.mockRejectedValue(new Error("Database error"));

    const response = await supertest(app).get("/cars");

    expect(response.status).toBe(500);
    expect(response.text).toBe("Internal server error");
  });

  it("should render admin view", async () => {
    const mockCars = [
      {
        id: 1,
        brand: "Test Brand",
        model: "Test Model 1",
        year: "Test Year",
        mileage: "Test Mileage",
        color: "Test Color",
        air_conditioning: "Test AC",
        passengers: "Test Passengers",
        transmission: "Test Transmission",
        panoramic_sunroof: "Test Sunroof",
      },

      { id: 2, brand: "Car 2", model: "Model 2", year: 2021 },
    ];

    carGetServiceMock.getAllCars.mockResolvedValue(mockCars);

    const response = await supertest(app).get("/admin/dashboard");

    expect(response.status).toBe(200);
    expect(response.text).toContain(`<td>${mockCars[0].brand}</td>`);
    expect(response.text).toContain(`<td>${mockCars[0].model}</td>`);
    expect(response.text).toContain(`<td>${mockCars[0].year}</td>`);
    expect(response.text).toContain(`<td>${mockCars[0].mileage}</td>`);
    expect(response.text).toContain(`<td>${mockCars[0].color}</td>`);
    expect(response.text).toContain(`<td>${mockCars[0].air_conditioning}</td>`);
    expect(response.text).toContain(`<td>${mockCars[0].passengers}</td>`);
    expect(response.text).toContain(`<td>${mockCars[0].transmission}</td>`);
    expect(response.text).toContain(
      `<td>${mockCars[0].panoramic_sunroof}</td>`
    );
    expect(response.text).toContain(`<td>${mockCars[1].brand}</td>`);
    expect(response.text).toContain(`<td>${mockCars[1].model}</td>`);
    expect(response.text).toContain(`<td>${mockCars[1].year}</td>`);
  });

  it("should return 500 if there is a problem getting cars for admin view", async () => {
    carGetServiceMock.getAllCars.mockRejectedValue(new Error("Database error"));

    const response = await supertest(app).get("/admin/dashboard");

    expect(response.status).toBe(500);
    expect(response.text).toBe("Internal server error");
  });
});

describe("CarController", () => {
  describe("renderEditCarView", () => {
    it("should render the edit car view with the car data", async () => {
      const CarGetService = {
        getCarById: jest.fn().mockResolvedValue({ id: 1, name: "Car 1" }),
      };
      const carController = new CarController(CarGetService);
      const req = { params: { id: 1 } };
      const res = {
        render: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await carController.renderEditCarView(req, res);

      expect(CarGetService.getCarById).toHaveBeenCalledWith(req.params.id);
      expect(res.render).toHaveBeenCalledWith("admin/edit_car", {
        car: { id: 1, name: "Car 1" },
      });
    });

    it("should handle errors from the getCarById method", async () => {
      const CarGetService = {
        getCarById: jest.fn().mockRejectedValue(new Error("Error getting car")),
      };
      const carController = new CarController(CarGetService);
      const req = { params: { id: 1 } };
      const res = {
        render: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await carController.renderEditCarView(req, res);

      expect(CarGetService.getCarById).toHaveBeenCalledWith(req.params.id);
      expect(res.render).toHaveBeenCalledWith("error", {
        error: new Error("Error getting car"),
      });
    });

    describe("CarController", () => {
      describe("renderEditCarView", () => {
        it("should respond with 404 when the car is not found", async () => {
          const CarGetService = {
            getCarById: jest.fn().mockResolvedValue(null),
          };
          const carController = new CarController(CarGetService);
          const req = { params: { id: 1 } };
          const res = {
            render: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
          };

          await carController.renderEditCarView(req, res);

          expect(CarGetService.getCarById).toHaveBeenCalledWith(req.params.id);
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.send).toHaveBeenCalledWith("Car not found");
        });
      });
    });
  });
});
