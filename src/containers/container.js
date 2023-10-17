import { DIContainer } from "rsdi";
import CarGetController from "../controllers/CarGetController.js";
import CarGetService from "../services/CarGetServices.js";
import initDatabase from "../config/dbConfig.js";

/**
 * Configures DI container.
** Create the DI container, configure the database and pass it to CarGetService.
** The CarGetService will be injected into the CarGetController.
** The CarGetController will be injected into app.js.
** The app.js will use the CarGetController to retrieve the cars.
 *
 * @return {DIContainer} The configured DI container.
 */
function configureDI() {

  
  const container = new DIContainer();

  const db = initDatabase(process.env.DB_PATH);
  container.add("db", () => db);
  container.add("CarGetService", () => new CarGetService(container.get("db")));
  container.add(
    "CarGetController",
    () => new CarGetController(container.get("CarGetService"))
  );

  return container;
}

export default configureDI;
