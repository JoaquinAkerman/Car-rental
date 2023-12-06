import CarController from '../CarController'; 
describe('CarController', () => {
  test('should delete a car and redirect to the dashboard', async () => {
    const id = 'testId';
    const req = { params: { id } };
    const res = {
      cookie: jest.fn(),
      redirect: jest.fn(),
    };

    const carController = new CarController();
    carController.CarUpdateService = { deleteCar: jest.fn().mockResolvedValue() };

    await carController.deleteCar(req, res);

    expect(carController.CarUpdateService.deleteCar).toHaveBeenCalledWith(id);
    expect(res.cookie).toHaveBeenCalledWith("message", "Car deleted successfully");
    expect(res.redirect).toHaveBeenCalledWith('/admin/dashboard');
  });

  test('should handle errors', async () => {
    const id = 'testId';
    const req = { params: { id } };
    const res = {
      cookie: jest.fn(),
      redirect: jest.fn(),
    };

    const carController = new CarController();
    carController.CarUpdateService = { deleteCar: jest.fn().mockRejectedValue(new Error('Test error')) };

    await carController.deleteCar(req, res);

    expect(res.cookie).toHaveBeenCalledWith("message", "Internal server error");
    expect(res.redirect).toHaveBeenCalledWith('/admin/dashboard');
  });
});