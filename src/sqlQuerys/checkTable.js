const dotenv = require('dotenv');
dotenv.config();

const dbConfig = require('../config/dbConfig.js');
console.log(process.env.TEST, "test from createCars");
const db = dbConfig(process.env.DB_PATH);
const checkTableSQL = `SELECT * FROM cars;`;

db.all(checkTableSQL, (err, rows) => {
    if (err) {
        console.error(err.message);
    } 

    console.log("List of cars: ");

    rows.forEach((row) => {
        console.log(`ID: ${row.id}`);
        console.log(`Brand: ${row.brand}`);
        console.log(`Model: ${row.model}`);
        console.log(`Year: ${row.year}`);
        console.log(`Mileage: ${row.mileage}`);
        console.log(`Color: ${row.color}`);
        console.log(`Air conditioning: ${row.air_conditioning}`);
        console.log(`Passengers: ${row.passengers}`);
        console.log(`Transmission: ${row.transmission}`);
        console.log(`Panoramic_sunroof: ${row.panoramic_sunroof}`)
        console.log("---------------------------")

    });

    db.close();
});
