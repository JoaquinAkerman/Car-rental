import dotenv from "dotenv";
dotenv.config();
import express from "express";
import nunjucks from "nunjucks";
import configureDI from "./src/containers/container.js";

const app = express();
const container = configureDI();
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/cars", (req, res) => {
  console.log("fetching cars from app.js");
  const carGetController = container.get("CarGetController");
  carGetController.getCars(req, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
