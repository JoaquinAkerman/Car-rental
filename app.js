import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

// Configurations
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server


app.listen(port || 3000, () => {
  console.log(`Server listening at http://localhost:${port}`);

  
});
