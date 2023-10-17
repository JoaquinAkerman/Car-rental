class CarGetService {
  constructor(db) {
    this.db = db;
  }
  
  /**
   * Retrieves all cars from the database.
   *
   * @param {function} callback - The callback function to handle the result or error.
   * @return {void} This function does not return a value directly,
   *  but instead calls the callback function with the result or error.
   */
  getAllCars(callback) {
    this.db.all("SELECT * FROM cars", (err, cars) => {
      if (err) return callback(err, null);
      callback(null, cars);
    });
  }
}

export default CarGetService;
