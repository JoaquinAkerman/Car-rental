import sqlite3 from "sqlite3";

/**
 * Initializes the database with the provided database path.
 *
 * @param {string} dbPath - The path to the database file.
 * @return {object} - The initialized database object.
 */
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

export default initDatabase;
