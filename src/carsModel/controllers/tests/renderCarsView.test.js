import express from "express";
import CarController from "../CarController.js";
import supertest from "supertest";
import expressNunjucks from "express-nunjucks";

describe("CarController", () => {
  let carGetServiceMock;
  let carController;
  let app;

  beforeEach(() => {
    jest.resetAllMocks();
    carGetServiceMock = {
      getAllCars: jest.fn(),
      getCarById: jest.fn(),
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
      `<strong>Brand:</strong> ${mockCars[0].brand}`
    );
    expect(response.text).toContain(
      `strong>Model:</strong> ${mockCars[0].model}`
    );
    expect(response.text).toContain(
      `<strong>Year:</strong> ${mockCars[0].year}`
    );
    expect(response.text).toContain(
      `<strong>Mileage:</strong> ${mockCars[0].mileage}`
    );
    expect(response.text).toContain(
      `<strong>Colors:</strong> ${mockCars[0].color}`
    );
    expect(response.text).toContain(
      `<strong>Air conditioning:</strong> ${mockCars[0].air_conditioning}`
    );
    expect(response.text).toContain(
      `<strong>Passengers:</strong> ${mockCars[0].passengers}`
    );
    expect(response.text).toContain(
      `<strong>Transmission:</strong> ${mockCars[0].transmission}`
    );
    expect(response.text).toContain(
      `<strong>Panoramic sunroof:</strong> ${mockCars[0].panoramic_sunroof}`
    );
  });

  it("should return 500 if there is a problem getting cars", async () => {
    carGetServiceMock.getAllCars.mockRejectedValue(new Error("Database error"));

    const response = await supertest(app).get("/cars");

    expect(response.status).toBe(500);
    expect(response.text).toBe("Internal server error");
  });
});
