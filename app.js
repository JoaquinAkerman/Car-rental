// Imports
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import express from "express";
import methodOverride from "method-override";
import nunjucks from "nunjucks";
import session from "express-session";
import configureDI from "./src/carsModel/container/container.js";
import registerRoutes from "./src/routes/routes.js";

// Constants
const app = express();
const viewsPath = "./views";
const port =
  process.env.NODE_ENV === "test" ? process.env.TEST_PORT : process.env.PORT;
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set to true if your application is served over HTTPS
  })
);

// Configurations
dotenv.config();
app.set("view engine", "njk");
nunjucks.configure(viewsPath, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true,
});

// Setting up the Controllers
const container = configureDI();
const controllers = [
  container.get("CarController"),
  container.get("AuthController"),
];
registerRoutes(app, controllers);

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
