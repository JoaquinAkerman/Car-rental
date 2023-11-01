
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
}

export default CarGetService;
