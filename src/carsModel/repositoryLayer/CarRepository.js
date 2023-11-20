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
    } = newCarData;

    const updated_at = new Date().toISOString();

    const query = `
      UPDATE cars SET 
      brand = ?, 
      model = ?, 
      day_price = ?, 
      year = ?, 
      mileage = ?, 
      color = ?, 
      air_conditioning = ?, 
      passengers = ?, 
      transmission = ?, 
      panoramic_sunroof = ?, 
      updated_at = ? 
      WHERE id = ?
    `;

    return new Promise((resolve, reject) => {
      this.db.run(
        query,
        [
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
          updated_at,
          id,
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

  deleteCar(id) {
    const query = "DELETE FROM cars WHERE id = ?";

    return new Promise((resolve, reject) => {
      this.db.run(query, [id], function (error) {
        if (error) {
          console.error(error);
          reject(new Error(`Error deleting car with id ${id}`));
        }
        resolve(this.changes);
      });
    });
  }

  createCar(carData) {
    const now = new Date().toISOString();
    carData.created_at = now;
    carData.updated_at = now;
    const query =
      "INSERT INTO cars (brand, model, day_price, year, mileage, color, air_conditioning, passengers, transmission, panoramic_sunroof, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const params = [
      carData.brand,
      carData.model,
      carData.day_price,
      carData.year,
      carData.mileage,
      carData.color,
      carData.air_conditioning,
      carData.passengers,
      carData.transmission,
      carData.panoramic_sunroof,
      carData.created_at,
      carData.updated_at,
    ];

    return new Promise((resolve, reject) => {
      this.db.run(query, params, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }
}

export default CarRepository;
