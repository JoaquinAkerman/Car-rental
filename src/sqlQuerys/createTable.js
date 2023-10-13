const dotenv = require("dotenv");
dotenv.config();

const dbConfig = require("../config/dbConfig.js");

console.log(process.env.TEST, "test from createCars");
const db = dbConfig(process.env.DB_PATH);

// Create a table in the database named 'cars'

const createCarsTableSQL = `
    CREATE TABLE IF NOT EXISTS cars (
        id INTEGER PRIMARY KEY,
        brand TEXT,
        model TEXT,
        year INTEGER,
        mileage INTEGER,
        color TEXT,
        air_conditioning TEXT,
        passengers INTEGER,
        transmission TEXT,
        panoramic_sunroof TEXT
    );
    `;

//ran the query to create the table

db.run(createCarsTableSQL, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Cars table created");
  }
  // close the connection
  db.close();
});
