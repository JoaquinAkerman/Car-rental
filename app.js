import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import express from "express";
import nunjucks from "nunjucks";
import session from "express-session";

import configureDI from "./src/carsModel/container/container.js";
import registerRoutes from "./src/routes/routes.js";


// Setup express
const app = express();
app.set("view engine", "njk");
const viewsPath = "./views";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET, 
  resave: false,
  saveUninitialized: true,
}));
const port = process.env.PORT || 3000;

// Setup nunjucks
nunjucks.configure(viewsPath, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true,
});

// Setup routes
const container = configureDI();
const controllers = [
  container.get('CarController'),
  container.get('AuthController'),
];
registerRoutes(app, controllers);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

//