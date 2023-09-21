const express = require("express");
const nunjucks = require("nunjucks");
const app = express();

// Nunjucks config
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

//Express config
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Routes and app logic here
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}
    `);
});

app.get('/cars', (req, res) => {
  // Here, we retrieve the cars from the database
  // Then we render the index.html file with the cars data
  res.render('index.html', { cars:cars /* cars from the database */ });
});

app.post('/autos/agregar', (req, res) => {
  // Here, we add a new car to the database
  // Then we render the index.html file with the cars data
});
