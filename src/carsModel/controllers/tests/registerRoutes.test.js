import express from "express";
import supertest from "supertest";
import CarController from "../CarController.js";

describe("CarController", () => {
  let carController;
  let app;
  let request;

  beforeEach(() => {
    carController = new CarController();
    app = express();
    carController.registerRoutes(app);
    request = supertest(app);
    carController.ensureLoggedIn = jest.fn((req, res, next) => next());
  });

  describe("registerRoutes", () => {
    it("should respond to a GET request at the /cars route", () => {
      carController.renderCarsView = jest.fn((req, res) => res.sendStatus(200));
      return request
        .get("/cars")
        .expect(200)
        .then(() => {
          expect(carController.renderCarsView).toHaveBeenCalled();
        });
    });

    it("should respond to a GET request at the /admin/dashboard route", () => {
      carController.renderAdminView = jest.fn((req, res) => res.sendStatus(200));
      return request
        .get("/admin/dashboard")
        .expect(200)
        .then(() => {
          expect(carController.renderAdminView).toHaveBeenCalled();
        });
    });

    it("should respond to a GET request at the /admin/edit/:id route", () => {
      carController.renderEditCarView = jest.fn((req, res) => res.sendStatus(200));
      return request
        .get("/admin/edit_car/:id")
        .expect(200)
        .then(() => {
          expect(carController.renderEditCarView).toHaveBeenCalled();
        });
    });

    it("should respond to a PATCH request at the /admin/edit_car/:id route", () => {
      carController.updateCar = jest.fn((req, res) => res.sendStatus(200));
      return request
        .patch("/admin/edit_car/:id")
        .expect(200)
        .then(() => {
          expect(carController.updateCar).toHaveBeenCalled();
        });
    });
  });

  describe("registerRoutes", () => {
    it("should respond to a POST request at the /admin/add route", () => {
      carController.createCar = jest.fn((req, res) => res.sendStatus(200));
      return request
        .post("/admin/add")
        .expect(200)
        .then(() => {
          expect(carController.createCar).toHaveBeenCalled();
        });
    });
  });

  describe("renderAddCarView", () => {
    it("should render the add car view", () => {
      carController.renderAddCarView = jest.fn((req, res) => res.sendStatus(200));
      return request
        .get("/admin/add")
        .expect(200)
        .then(() => {
          expect(carController.renderAddCarView).toHaveBeenCalled();
        });
    });
  });

  describe("deleteCar", () => {
    it("should delete a car", () => {
      carController.deleteCar = jest.fn((req, res) => res.sendStatus(200));
      return request
        .delete("/admin/delete/:id")
        .expect(200)
        .then(() => {
          expect(carController.deleteCar).toHaveBeenCalled();
        });
    });
  });
});
