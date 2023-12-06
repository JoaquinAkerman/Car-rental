import CarController from '../CarController'; 

describe('CarController', () => {
  test('should create a car and redirect to the dashboard', async () => {
    const carData = { /* your car data here */ 
    brand: 'Toyota',
    model: 'Camry',
    year: 2022,
    day_price: 100,
    mileage: 10000,
    color: 'blue',
    air_conditioning: 'Yes',
    passengers: 5,
    transmission: 'Automatic',
    panoramic_sunroof: 'Yes',
    
  };
    const req = { body: carData };
    const res = {
      cookie: jest.fn(),
      redirect: jest.fn(),
    };

    const carController = new CarController();
    carController.CarValidator = jest.fn();
    carController.CarUpdateService = { createCar: jest.fn().mockResolvedValue() };

    await carController.createCar(req, res);

    expect(carController.CarValidator).toHaveBeenCalledWith(carData);
    expect(carController.CarUpdateService.createCar).toHaveBeenCalledWith(carData);
    expect(res.cookie).toHaveBeenCalledWith("message", "Car saved successfully", expect.any(Object));
    expect(res.redirect).toHaveBeenCalledWith('/admin/dashboard');
  });

  test('should handle errors', async () => {
    const carData = { /* your car data here */ };
    const req = { body: carData };
    const res = {
      cookie: jest.fn(),
      redirect: jest.fn(),
    };

    const carController = new CarController();
    carController.CarValidator = jest.fn();
    carController.CarUpdateService = { createCar: jest.fn().mockRejectedValue(new Error('Test error')) };

    await carController.createCar(req, res);

    expect(res.cookie).toHaveBeenCalledWith("message", expect.stringContaining("Internal server error"), expect.any(Object));
    expect(res.redirect).toHaveBeenCalledWith('/admin/dashboard');
  });
});