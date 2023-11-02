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
      { id: 1, Brand: "Car 1", Model: "Model 1" },
      { id: 2, Brand: "Car 2", Model: "Model 2" },
    ];
  
    carGetServiceMock.getAllCars.mockResolvedValue(mockCars);
  
    const response = await supertest(app).get("/cars");
  
    expect(response.status).toBe(200);
    expect(response.text).toContain("Brand:");
    expect(response.text).toContain("Model:");
    console.log(response.text);
  });
  
  it("should return 500 if there is a problem getting cars", async () => {
    carGetServiceMock.getAllCars.mockRejectedValue(new Error("Database error"));
  
    const response = await supertest(app).get("/cars");
  
    expect(response.status).toBe(500);
    expect(response.text).toBe("Internal server error");
  });});