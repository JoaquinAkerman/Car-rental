import sqlite3 from "sqlite3";
import dotenv from "dotenv";

dotenv.config("../../.env");

export default class DatabaseService {
  constructor() {
    this.db = null;
  }

  getDatabase() {
    if (!this.db) {
      let dbPath = process.env.DB_PATH;

      if (process.env.NODE_ENV === "test") {
        dbPath = process.env.DB_TEST_PATH;
      }

      if (typeof dbPath === "undefined" || dbPath === "") {
        throw new Error("DB_PATH is not defined");
      }

      this.db = new sqlite3.Database(dbPath);
    }

    return this.db;
  }
}
