import { DIContainer } from "rsdi";
import dotenv from "dotenv";
dotenv.config("../../.env");

console.log(process.env.TEST, "<----test from container");

import CarGetController from "../controllers/CarGetController.js";
import CarGetService from "../servicesLayer/CarGetServices.js";
import CarRepository from "../repositoryLayer/CarRepository.js";

export default function configureDI() {
    const dbPath = process.env.DB_PATH;
    const container = new DIContainer();
  
    container.add("CarGetController", ({ CarGetService }) => new CarGetController(CarGetService));
    container.add("CarRepository", () => new CarRepository(dbPath));
    container.add("CarGetService", ({ CarRepository }) => new CarGetService(CarRepository));
  
    return container;
  }