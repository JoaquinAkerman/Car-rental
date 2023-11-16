class CarRepository {
  /**
   * Creates a new instance of the constructor.
   *
   * @param {type} db - The database object.
   */
  constructor(db) {
    this.db = db;
  }

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

  updateCar(id, newCarData) {
    return new Promise((resolve, reject) => {
      const {
        brand,
        model,
        day_price,
        year,
        mileage,
        color,
        air_conditioning,
        passengers,
        transmission,
        panoramic_sunroof,
        created_at,
        updated_at,
      } = newCarData;
      const query =
        "UPDATE cars SET brand = ?, model = ?, day_price = ?, year = ?, mileage = ?, Color = ?, air_conditioning = ?, passengers = ?, transmission = ?, panoramic_sunroof = ?, created_at = ?, updated_at = ? WHERE id = ?";

      this.db.run(
        query,
        [
          brand,
          model,
          day_price,
          year,
          id,
          mileage,
          color,
          air_conditioning,
          passengers,
          transmission,
          panoramic_sunroof,
          created_at,
          updated_at,
        ],
        function (error) {
          if (error) {
            console.error(error);
            reject(new Error(`Error updating car with id ${id}`));
          }
          resolve(this.changes);
        }
      );
    });
  }
}

export default CarRepository;
