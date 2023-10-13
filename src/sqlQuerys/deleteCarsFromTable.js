const dotenv = require("dotenv");
dotenv.config();

const dbConfig = require("../config/dbConfig.js");

console.log(process.env.TEST, "test from createCars");
const db = dbConfig(process.env.DB_PATH);

const deleteAllRowsSQL = `DELETE FROM cars;`;

db.run(deleteAllRowsSQL, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("All rows deleted from the 'cars' table.");
  }

  db.close();
});
