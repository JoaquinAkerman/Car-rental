import dotenv from "dotenv";
import { DIContainer } from "rsdi";
import sqlite3 from "sqlite3";

import CarController from "../controllers/CarController.js";
import CarGetService from "../servicesLayer/CarGetService.js";
import CarRepository from "../repositoryLayer/CarRepository.js";

dotenv.config("../../.env");
const db = new sqlite3.Database(process.env.DB_PATH);

export default function configureDI() {
  const container = new DIContainer();

  container.add(
    "CarController",
    ({ CarGetService }) => new CarController(CarGetService)
  );
  container.add("CarRepository", () => new CarRepository(db));
  container.add(
    "CarGetService",
    ({ CarRepository }) => new CarGetService(CarRepository)
  );

  return container;
}
