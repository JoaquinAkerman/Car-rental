import CarUpdateService from "../CarUpdateService";

describe("CarUpdateService", () => {
  let carRepository;
  let carUpdateService;

  beforeEach(() => {
    carRepository = {
      getCarById: jest.fn(),
      updateCar: jest.fn(),
    };
    carUpdateService = new CarUpdateService(carRepository);
  });

  it("updateCar updates the car data if the car exists", async () => {
    const id = "1";
    const newCarData = {
      brand: "Test Brand",
      model: "Test Model",
      day_price: 50,
      year: 2022,
      mileage: 1000,
      color: "Red",
      air_conditioning: true,
      passengers: 5,
      transmission: "Automatic",
      panoramic_sunroof: true,
    };
    const car = { id, ...newCarData };

    carRepository.getCarById.mockResolvedValue(car);
    carRepository.updateCar.mockResolvedValue(1);

    const changes = await carUpdateService.updateCar(id, newCarData);

    expect(carRepository.getCarById).toHaveBeenCalledWith(id);
    expect(carRepository.updateCar).toHaveBeenCalledWith(id, newCarData);
    expect(changes).toBe(1);
  });

  it("updateCar throws an error if the car does not exist", async () => {
    const id = "1";
    const newCarData = {
      brand: "Test Brand",
      model: "Test Model",
      day_price: 50,
      year: 2022,
      mileage: 1000,
      color: "Red",
      air_conditioning: true,
      passengers: 5,
      transmission: "Automatic",
      panoramic_sunroof: true,
    };

    carRepository.getCarById.mockResolvedValue(null);

    await expect(carUpdateService.updateCar(id, newCarData)).rejects.toThrow(
      `Car with id ${id} not found`
    );

    expect(carRepository.getCarById).toHaveBeenCalledWith(id);
    expect(carRepository.updateCar).not.toHaveBeenCalled();
  });
});

describe("deleteCar", () => {
  it("should throw an error if car with given id not found", async () => {
    const id = 1;
    const carRepository = {
      getCarById: jest.fn().mockResolvedValue(null),
      deleteCar: jest.fn(),
    };
    const service = new CarUpdateService(carRepository);

    await expect(service.deleteCar(id)).rejects.toThrowError(
      `Car with id ${id} not found`
    );
    expect(carRepository.getCarById).toHaveBeenCalledWith(id);
    expect(carRepository.deleteCar).not.toHaveBeenCalled();
  });

  it("should delete the car if it exists", async () => {
    const id = 1;
    const car = { id: 1, make: "Toyota", model: "Camry" };
    const carRepository = {
      getCarById: jest.fn().mockResolvedValue(car),
      deleteCar: jest.fn().mockResolvedValue(),
    };
    const service = new CarUpdateService(carRepository);

    await service.deleteCar(id);
    expect(carRepository.getCarById).toHaveBeenCalledWith(id);
    expect(carRepository.deleteCar).toHaveBeenCalledWith(id);
  });
});
