const sqlite3 = require('sqlite3').verbose();

// Database configuration 
function initDatabase(dbPath) {
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("error:" + err.message);
    } else {
      console.log("Connected to the database from dbConfig.js");
    }
  });

  return db;
}

module.exports = initDatabase;
