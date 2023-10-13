const dotenv = require("dotenv");
dotenv.config();

const dbConfig = require("../config/dbConfig.js");

console.log(process.env.TEST, "test from createCars");
const db = dbConfig(process.env.DB_PATH);

const dropTableSQL = `DROP TABLE IF EXISTS cars;`;

db.run(dropTableSQL, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("The 'cars' table has been dropped.");
  }

  db.close();
});
