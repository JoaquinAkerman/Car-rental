class CarUpdateService {
    constructor(carRepository) {
        this.carRepository = carRepository;
    }

    async updateCar(id, newCarData) {
        const car = await this.carRepository.getCarById(id);

        if (!car) {
            throw new Error('Car not found');
        }

        await this.carRepository.updateCar(id, newCarData);
    }
}

export default CarUpdateService;