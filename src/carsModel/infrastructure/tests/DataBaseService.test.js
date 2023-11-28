import sqlite3 from "sqlite3";
import DatabaseService from "../DatabaseService";

describe("DatabaseService", () => {
  let service;

  beforeEach(() => {
    service = new DatabaseService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Constructor", () => {
    it("should initialize the db property to null", () => {
      expect(service.db).toBeNull();
    });
  });

  describe("getDatabase", () => {

    it("should throw an error if DB_PATH is not defined", () => {
      process.env.NODE_ENV = 'production';
      delete process.env.DB_PATH;  
      const service = new DatabaseService();
      expect(() => service.getDatabase()).toThrow("DB_PATH is not defined");
    });
    it("should return the existing db instance if it's not null", () => {
      service.db = "existing db instance";
      const result = service.getDatabase();
      expect(result).toBe("existing db instance");
    });

    it("should create a new db instance if it's null", () => {
      process.env.DB_PATH = "./src/db/testDatabase.db";
      const mockDatabase = jest.fn();
      sqlite3.Database = mockDatabase;

      service.getDatabase();

      expect(mockDatabase).toHaveBeenCalledWith("./src/db/testDatabase.db");
    });

    it("should use DB_TEST_PATH if NODE_ENV is test", () => {
      process.env.DB_PATH = undefined;
      process.env.NODE_ENV = "test";
      process.env.DB_TEST_PATH = "test_db_path";
      const mockDatabase = jest.fn();
      sqlite3.Database = mockDatabase;

      service.getDatabase();

      expect(mockDatabase).toHaveBeenCalledWith("test_db_path");
    });
  });
});
