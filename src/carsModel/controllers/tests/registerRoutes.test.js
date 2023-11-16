import express from 'express';
import supertest from 'supertest';
import CarController from '../CarController.js';

describe('CarController', () => {
  describe('registerRoutes', () => {
    it('should respond to a GET request at the /cars route', () => {
      const carController = new CarController();
      const app = express();
      carController.registerRoutes(app);
      const request = supertest(app);

      carController.renderCarsView = jest.fn((req, res) => res.sendStatus(200));

      return request.get('/cars')
        .expect(200)
        .then(() => {
          expect(carController.renderCarsView).toHaveBeenCalled();

        });
    });
  });
});