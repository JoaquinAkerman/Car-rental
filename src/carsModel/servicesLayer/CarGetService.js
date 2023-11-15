
class CarGetService {
  constructor(CarRepository) {
    this.CarRepository = CarRepository;
  }

  async getAllCars() {
    try {
      const cars = await this.CarRepository.getAllCars();
      return cars;
    } catch (error) {
      console.error(error);
      throw new Error('Error getting cars');
    } 
  }

  async getCarById(id) {
    try {
      const car = await this.CarRepository.getCarById(id);
      return car;
    } catch (error) {
      console.error(error);
      throw new Error('Error getting car');
    } 
  }
}

export default CarGetService;
