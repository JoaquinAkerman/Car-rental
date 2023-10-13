
const dotenv = require('dotenv');
dotenv.config();

const dbConfig = require('../config/dbConfig.js');

console.log(process.env.TEST, "test from createCars");
const db = dbConfig(process.env.DB_PATH);


// Data of the cars to insert
const carsToInsert = [
  {
    brand: 'Toyota',
    model: 'Corolla',
    year: 2022,
    mileage: 15000,
    color: 'Blue',
    air_conditioning: 'Yes',
    passengers: 5,
    transmission: 'Automatic'
  },
  {
    brand: 'Honda1',
    model: 'Civic',
    year: 2021,
    mileage: 20000,
    color: 'Gray',
    air_conditioning: 'Yes',
    passengers: 4,
    transmission: 'Manual',
    panoramic_sunroof: "No"
  }
];

// Insert the cars into the database
for (const car of carsToInsert) {
  const { brand, model, year, mileage, color, air_conditioning, passengers, transmission,panoramic_sunroof  } = car;
  db.run(
    `INSERT INTO cars (brand, model, year, mileage, color, air_conditioning, passengers, transmission, panoramic_sunroof) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`,
    [brand, model, year, mileage, color, air_conditioning, passengers, transmission, panoramic_sunroof],
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`A car has been inserted: ${brand} ${model}`);
      }
    }
  );
}

// Close the connection to the database
db.close();
