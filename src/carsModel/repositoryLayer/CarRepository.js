class CarRepository {
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
}

export default CarRepository;
