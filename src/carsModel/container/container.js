import dotenv from "dotenv";
import { DIContainer } from "rsdi";
import sqlite3 from "sqlite3";

import AuthController from "../controllers/AuthController.js";
import CarController from "../controllers/CarController.js";
import AuthenticationService from "../servicesLayer/AuthenticationService.js";
import CarGetService from "../servicesLayer/CarGetService.js";
import CarUpdateService from "../servicesLayer/CarUpdateService.js";
import CarRepository from "../repositoryLayer/CarRepository.js";

dotenv.config("../../.env");
const db = new sqlite3.Database(process.env.DB_PATH);

/**
 * Configures the dependency injection container.
 *
 * @return {DIContainer} The configured DI container.
 */
export default function configureDI() {
  const container = new DIContainer();

  container.add("CarRepository", () => new CarRepository(db));
  container.add(
    "CarUpdateService",
    ({ CarRepository }) => new CarUpdateService(CarRepository)
  );
  container.add(
    "CarGetService",
    ({ CarRepository }) => new CarGetService(CarRepository)
  );
  container.add("AuthenticationService", () => new AuthenticationService());
  container.add(
    "AuthController",
    ({ AuthenticationService }) => new AuthController(AuthenticationService)
  );

  container.add(
    "CarController",
    ({ CarGetService, AuthenticationService, CarUpdateService }) =>
      new CarController(CarGetService, AuthenticationService, CarUpdateService)
  );

  return container;
}
