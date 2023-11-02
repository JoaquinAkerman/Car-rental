
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import nunjucks from "nunjucks";

import configureDI from "./src/carsModel/container/container.js";

const app = express();
app.set('view engine', 'njk');
const port = process.env.PORT || 3000;
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

const container = configureDI();
const { CarController } = container;


// Register the routes
CarController.registerRoutes(app);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
