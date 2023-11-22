class CarUpdateService {
  constructor(carRepository) {
    this.carRepository = carRepository;
  }

  async updateCar(id, newCarData) {
    const car = await this.carRepository.getCarById(id);

    if (!car) {
      throw new Error(`Car with id ${id} not found`);
    }

    return this.carRepository.updateCar(id, newCarData);
  }

  async deleteCar(id) {
    const car = await this.carRepository.getCarById(id);

    if (!car) {
      throw new Error(`Car with id ${id} not found`);
    }

    return this.carRepository.deleteCar(id);
  }

  async createCar(carData) {
    if (!carData.brand || !carData.model || !carData.day_price) {
      throw new Error("Brand, model and day price are required");
    }

    if (carData.id) {
      // If the car has an id, update the car
      return this.carRepository.updateCar(carData);
    } else {
      // If the car doesn't have an id, create a new car
      return this.carRepository.createCar(carData);
    }
  }
}

export default CarUpdateService;
