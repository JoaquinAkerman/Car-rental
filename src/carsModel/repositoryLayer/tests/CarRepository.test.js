import sqlite3 from "sqlite3";
import CarRepository from "../CarRepository.js";

describe("CarRepository getting cars", () => {
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

describe("getCarById", () => {
  it("should return the car with the given id", async () => {
    const db = {
      get: jest.fn((query, params, callback) => {
        callback(null, { id: 1, name: "Car 1" });
      }),
    };
    const carRepository = new CarRepository(db);
    const id = 1;

    const car = await carRepository.getCarById(id);

    expect(db.get).toHaveBeenCalledWith(
      "SELECT * FROM cars WHERE id = ?",
      [id],
      expect.any(Function)
    );
    expect(car).toEqual({ id: 1, name: "Car 1" });
  });

  it("should throw an error if there is a database error", async () => {
    const db = {
      get: jest.fn((query, params, callback) => {
        callback(new Error("Database error"));
      }),
    };
    const carRepository = new CarRepository(db);
    const id = 1;

    await expect(carRepository.getCarById(id)).rejects.toThrow(
      `Error getting car with id ${id}`
    );
    expect(db.get).toHaveBeenCalledWith(
      "SELECT * FROM cars WHERE id = ?",
      [id],
      expect.any(Function)
    );
  });
});

describe("CarRepository updating car", () => {
  let db;
  let carRepository;

  beforeEach(() => {
    db = { run: jest.fn() };
    db.run.mockImplementation(function (query, params, callback) {
      callback.call({ changes: 1 }, null);
    });
    carRepository = new CarRepository(db);
  });

  it("updateCar updates the car data", async () => {
    const id = "1";
    const newCarData = {
      brand: "Test Brand",
      model: "Test Model",
      day_price: 50,
      year: 2022,
      mileage: 1000,
      color: "Red",
      air_conditioning: true,
      passengers: 5,
      transmission: "Automatic",
      panoramic_sunroof: true,
    };

    db.run.mockImplementation(function (query, params, callback) {
      callback.call({ changes: 1 }, null);
    });

    const changes = await carRepository.updateCar(id, newCarData);

    expect(changes).toBe(1);
    expect(db.run).toHaveBeenCalled();
  });

  it("updateCar handles errors", async () => {
    const id = "1";
    const newCarData = {
      brand: "Test Brand",
      model: "Test Model",
      day_price: 50,
      year: 2022,
      mileage: 1000,
      color: "Red",
      air_conditioning: true,
      passengers: 5,
      transmission: "Automatic",
      panoramic_sunroof: true,
    };

    const error = new Error("Database error");
    db.run.mockImplementation(function (query, params, callback) {
      callback.call(this, error);
    });

    console.error = jest.fn();

    try {
      await carRepository.updateCar(id, newCarData);
    } catch (e) {
      expect(e.message).toBe(`Error updating car with id ${id}`);
    }

    expect(console.error).toHaveBeenCalledWith(error);
    expect(db.run).toHaveBeenCalled();
  });
});

describe("CarRepository deleting car", () => {
  it("deleteCar deletes the car with the given id", async () => {
    const db = {
      run: jest.fn((query, params, callback) => {
        callback.call({ changes: 1 }, null);
      }),
    };
    const carRepository = new CarRepository(db);
    const id = 1;

    const changes = await carRepository.deleteCar(id);

    expect(changes).toBe(1);
    expect(db.run).toHaveBeenCalledWith(
      "DELETE FROM cars WHERE id = ?",
      [id],
      expect.any(Function)
    );
  });
  it("deleteCar throws an error if there is a database error", async () => {
    const db = {
      run: jest.fn((query, params, callback) => {
        const error = new Error('Database error');
        callback.call(null, error);
      }),
    };
    const carRepository = new CarRepository(db);
    const id = 1;

    await expect(carRepository.deleteCar(id)).rejects.toThrow(`Error deleting car with id ${id}`);
    expect(db.run).toHaveBeenCalledWith(
      "DELETE FROM cars WHERE id = ?",
      [id],
      expect.any(Function)
    );
  });
});


describe("CarRepository adding car", () => {
  it("createCar creates a new car", async () => {
    const db = {
      run: jest.fn((query, params, callback) => {
        callback.call({ lastID: 1 }, null);
      }),
    };
    const carRepository = new CarRepository(db);
    const newCarData = {
      brand: "Test Brand",
      model: "Test Model",
      day_price: 50,
      year: 2022,
      mileage: 1000,
      color: "Red",
      air_conditioning: true,
      passengers: 5,
      transmission: "Automatic",
      panoramic_sunroof: true,
    };
    await carRepository.createCar(newCarData);
    expect(db.run).toHaveBeenCalled();
    expect(db.run.mock.calls[0][0]).toContain("INSERT INTO cars");
    expect(db.run.mock.calls[0][1]).toEqual([
      newCarData.brand,
      newCarData.model,
      newCarData.day_price,
      newCarData.year,
      newCarData.mileage,
      newCarData.color,
      newCarData.air_conditioning,
      newCarData.passengers,
      newCarData.transmission,
      newCarData.panoramic_sunroof,
      expect.any(String), // created_at
      expect.any(String), // updated_at
    ]);
  });
});