
module.exports = (db, req, res) => {
    // get all cars from the database
    console.log('GET /cars');
    db.all('SELECT * FROM cars', (err, autos) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal server error - 500 - GET /cars failed');
        return;
      }
  
      // render  a list of cars
      res.render('index.html', { autos });
    });
  };
  