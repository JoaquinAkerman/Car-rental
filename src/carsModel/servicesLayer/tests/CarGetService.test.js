import CarGetService from "../CarGetService.js";

describe("CarGetService", () => {
  let carRepositoryMock;
  let carGetService;

  beforeEach(() => {
    carRepositoryMock = {
      getAllCars: jest.fn(),
    };
    carGetService = new CarGetService(carRepositoryMock);
  });

  it("should get all cars", async () => {
    const mockCars = [
      { id: 1, name: "Car 1" },
      { id: 2, name: "Car 2" },
    ];

    carRepositoryMock.getAllCars.mockResolvedValue(mockCars);

    const cars = await carGetService.getAllCars();
    expect(cars).toEqual(mockCars);
    expect(carRepositoryMock.getAllCars).toHaveBeenCalled();
  });

  it("should throw an error if there is a problem getting cars", async () => {
    carRepositoryMock.getAllCars.mockRejectedValue(new Error("Database error"));

    await expect(carGetService.getAllCars()).rejects.toThrow("Error getting cars");
    expect(carRepositoryMock.getAllCars).toHaveBeenCalled();
  });
});


describe('CarGetService', () => {
  describe('getCarById', () => {
    it('should return the car with the given id', async () => {
      // Arrange
      const CarRepository = {
        getCarById: jest.fn().mockResolvedValue({ id: 1, name: 'Car 1' }),
      };
      const carGetService = new CarGetService(CarRepository);
      const id = 1;

      // Act
      const car = await carGetService.getCarById(id);

      // Assert
      expect(CarRepository.getCarById).toHaveBeenCalledWith(id);
      expect(car).toEqual({ id: 1, name: 'Car 1' });
    });

    it('should throw an error if there is a repository error', async () => {
      // Arrange
      const CarRepository = {
        getCarById: jest.fn().mockRejectedValue(new Error("Error getting car")),
      };
      const carGetService = new CarGetService(CarRepository);
      const id = 1;

      // Act and Assert
      await expect(carGetService.getCarById(id)).rejects.toThrow("Error getting car");
      expect(CarRepository.getCarById).toHaveBeenCalledWith(id);
    });
  });
});