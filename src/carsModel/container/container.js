import dotenv from "dotenv";
import { DIContainer } from "rsdi";
import sqlite3 from "sqlite3";

import CarController from "../controllers/CarController.js";
import CarGetService from "../servicesLayer/CarGetService.js";
import CarRepository from "../repositoryLayer/CarRepository.js";
import AuthenticationService from "../servicesLayer/AuthenticationService.js";
import AuthController from "../controllers/AuthController.js";

dotenv.config("../../.env");
const db = new sqlite3.Database(process.env.DB_PATH);

/**
 * Configures the dependency injection container.
 *
 * @return {DIContainer} The configured DI container.
 */
export default function configureDI() {
  const container = new DIContainer();

  container.add(
    "CarController",
    ({ CarGetService, AuthenticationService }) =>
      new CarController(CarGetService, AuthenticationService)
  );
  container.add("CarRepository", () => new CarRepository(db));
  container.add(
    "CarGetService",
    ({ CarRepository }) => new CarGetService(CarRepository)
  );
  container.add("AuthenticationService", () => new AuthenticationService());

  container.add(
    "AuthController",
    ({ AuthenticationService }) => new AuthController(AuthenticationService)
  );

  return container;
}
