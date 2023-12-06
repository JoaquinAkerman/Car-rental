import dotenv from "dotenv";
dotenv.config("../../.env");
import { DIContainer } from "rsdi";

import CarController from "../controllers/CarController.js";
import CarGetService from "../servicesLayer/CarGetService.js";
import CarUpdateService from "../servicesLayer/CarUpdateService.js";
import CarRepository from "../repositoryLayer/CarRepository.js";
import carValidator from "../validators/carValidator.js";
import DatabaseService from "../infrastructure/DataBaseService.js";

/**
 * Configures the dependency injection container.
 *
 * @return {DIContainer} The configured DI container.
 */
export default function configureDI() {
  const container = new DIContainer();

  container.add("DatabaseService", () => new DatabaseService());

  container.add(
    "CarRepository",
    ({ DatabaseService }) => new CarRepository(DatabaseService.getDatabase())
  );
  container.add(
    "CarUpdateService",
    ({ CarRepository }) => new CarUpdateService(CarRepository)
  );
  container.add(
    "CarGetService",
    ({ CarRepository }) => new CarGetService(CarRepository)
  );

  container.add("carValidator", () => carValidator);

  container.add(
    "CarController",
    ({
      CarGetService,

      CarUpdateService,
      carValidator,
    }) => new CarController(CarGetService, CarUpdateService, carValidator)
  );

  return container;
}
