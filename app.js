const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const nunjucks = require("nunjucks");
const initDatabase = require("./src/config/dbConfig.js"); 

const app = express();

// Database config
const dbConfig = process.env.DB_PATH;
console.log(process.env.TEST)
const db = initDatabase(dbConfig); 

// Configure Nunjucks
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", (req, res) => {
  db.all("SELECT * FROM cars", (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      res.render("index.html", { cars: rows });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});