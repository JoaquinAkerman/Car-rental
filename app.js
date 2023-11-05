import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import express from "express";
import nunjucks from "nunjucks";

import configureDI from "./src/carsModel/container/container.js";

const app = express();
app.set("view engine", "njk");
const viewsPath = "./views";
const port = process.env.PORT || 3000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

nunjucks.configure(viewsPath, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true,
});
const container = configureDI();
const { CarController } = container;
//
// Register the routes
CarController.registerRoutes(app);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
