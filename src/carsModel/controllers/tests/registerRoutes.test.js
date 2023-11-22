import express from "express";
import supertest from "supertest";
import CarController from "../CarController.js";

describe("CarController", () => {
  describe("registerRoutes", () => {
    it("should respond to a GET request at the /cars route", () => {
      const carController = new CarController();
      const app = express();
      carController.registerRoutes(app);
      const request = supertest(app);

      carController.renderCarsView = jest.fn((req, res) => res.sendStatus(200));

      return request
        .get("/cars")
        .expect(200)
        .then(() => {
          expect(carController.renderCarsView).toHaveBeenCalled();
        });
    });
  });

  describe("registerRoutes", () => {
    it("should respond to a GET request at the /admin/dashboard route", () => {
      const carController = new CarController();
      const app = express();
      carController.registerRoutes(app);
      const request = supertest(app);

      carController.renderAdminView = jest.fn((req, res) =>
        res.sendStatus(200)
      );

      return request
        .get("/admin/dashboard")
        .expect(200)
        .then(() => {
          expect(carController.renderAdminView).toHaveBeenCalled();
        });
    });
  });

  describe("registerRoutes", () => {
    it("should respond to a GET request at the /admin/edit/:id route", () => {
      const carController = new CarController();
      const app = express();
      carController.registerRoutes(app);
      const request = supertest(app);

      carController.renderEditCarView = jest.fn((req, res) =>
        res.sendStatus(200)
      );

      return request
        .get("/admin/edit_car/:id")
        .expect(200)
        .then(() => {
          expect(carController.renderEditCarView).toHaveBeenCalled();
        });
    });
  });

  describe("registerRoutes", () => {
    it("should respond to a PATCH request at the /cars/:id route", () => {
      const carController = new CarController();
      const app = express();
      carController.registerRoutes(app);
      const request = supertest(app);

      carController.updateCar = jest.fn((req, res) => res.sendStatus(200));

      return request
        .patch("/cars/:id")
        .expect(200)
        .then(() => {
          expect(carController.updateCar).toHaveBeenCalled();
        });
    });
  });
});

describe("registerRoutes", () => {
  it("should respond to a POST request at the /admin/add route", () => {
    const carController = new CarController();
    const app = express();
    carController.registerRoutes(app);
    const request = supertest(app);

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
    const carController = new CarController();
    const app = express();
    carController.registerRoutes(app);
    const request = supertest(app);

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
    const carController = new CarController();
    const app = express();
    carController.registerRoutes(app);
    const request = supertest(app);

    carController.deleteCar = jest.fn((req, res) => res.sendStatus(200));

    return request
      .delete("/admin/delete/:id")
      .expect(200)
      .then(() => {
        expect(carController.deleteCar).toHaveBeenCalled();
      })
  });
});