import dotenv from "dotenv";
dotenv.config("../../.env");
import { DIContainer } from "rsdi";

import AuthController from "../controllers/AuthController.js";
import CarController from "../controllers/CarController.js";
import AuthenticationService from "../servicesLayer/AuthenticationService.js";
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
  container.add("AuthenticationService", () => new AuthenticationService());
  container.add(
    "AuthController",
    ({ AuthenticationService }) => new AuthController(AuthenticationService)
  );

  container.add("carValidator", () => carValidator);
 

  container.add(
    "CarController",
    ({
      CarGetService,
      AuthenticationService,
      CarUpdateService,
      carValidator,
      
    }) =>
      new CarController(
        CarGetService,
        AuthenticationService,
        CarUpdateService,
        carValidator,
        
      )
  );

  return container;
}
