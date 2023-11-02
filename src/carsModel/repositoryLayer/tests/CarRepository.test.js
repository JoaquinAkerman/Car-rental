import sqlite3 from "sqlite3";
import CarRepository from "../CarRepository.js";

describe("CarRepository", () => {
  let carRepository;
  let db;

  beforeAll((done) => {
    db = new sqlite3.Database(":memory:");
    carRepository = new CarRepository(db);

    db.run(
      "CREATE TABLE cars (id INTEGER PRIMARY KEY, name TEXT)",
      (createError) => {
        if (createError) {
          return done(createError);
        }

        db.run(
          `INSERT INTO cars (id, name) VALUES (1, 'Car 1'), (2, 'Car 2')`,
          (insertError) => {
            if (insertError) {
              return done(insertError);
            }

            done();
          }
        );
      }
    );
  });

  it("should get all cars", async () => {
    const mockCars = [
      { id: 1, name: "Car 1" },
      { id: 2, name: "Car 2" },
    ];

    const cars = await carRepository.getAllCars();
    expect(cars).toEqual(mockCars);
  });

  it("should throw an error if there is a problem getting cars", async () => {
    db.close();

    await expect(carRepository.getAllCars()).rejects.toThrow(
      "Error getting cars"
    );
  });
});