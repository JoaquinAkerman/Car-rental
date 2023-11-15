/**
 * CarRepository class for interacting with the cars table in the database.
 */
class CarRepository {
  /**
   * Construct a CarRepository object.
   * @param {object} db - The database object.
   */
  constructor(db) {
    this.db = db;
  }

  /**
   * Get all cars from the database.
   * @returns {Promise<Array>} A promise that resolves with an array of cars.
   */
  getAllCars() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM cars";

      this.db.all(query, [], (error, rows) => {
        if (error) {
          console.error(error);
          reject(new Error("Error getting cars"));
        }
        resolve(rows);
      });
    });
  }

  /**
   * Get a car by id from the database.
   * @param {number} id - The id of the car.
   * @returns {Promise<object>} A promise that resolves with the car object.
   */
  getCarById(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM cars WHERE id = ?";

      this.db.get(query, [id], (error, row) => {
        if (error) {
          console.error(error);
          reject(new Error(`Error getting car with id ${id}`));
        }
        resolve(row);
      });
    });
  }
}

export default CarRepository;