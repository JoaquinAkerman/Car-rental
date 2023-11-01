import sqlite3 from 'sqlite3';

class CarRepository {
  constructor(databasePath) {
    this.db = new sqlite3.Database(databasePath);
  }

  getAllCars() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM cars';

      this.db.all(query, [], (error, rows) => {
        if (error) {
          console.error(error);
          reject(new Error('Error getting cars'));
        }
        resolve(rows);
      });
    });
  }

 
}

export default CarRepository;//