import CarController from '../CarController.js';

describe('CarController', () => {
  let carController;
  let mockReq, mockRes;

  beforeEach(() => {
    const mockCarUpdateService = {
      deleteCar: jest.fn(),
    };
    carController = new CarController(null, null, mockCarUpdateService);
    mockReq = {
      params: { id: 1 },
    };
    mockRes = {
      cookie: jest.fn(),
      redirect: jest.fn(),
    };
  });

  it('should delete a car and redirect to the dashboard', async () => {
    await carController.deleteCar(mockReq, mockRes);
    expect(carController.CarUpdateService.deleteCar).toHaveBeenCalledWith(mockReq.params.id);
    expect(mockRes.cookie).toHaveBeenCalledWith('message', 'Car deleted successfully');
    expect(mockRes.redirect).toHaveBeenCalledWith('/admin/dashboard');
  });

  it('should handle errors and redirect to the dashboard', async () => {
    carController.CarUpdateService.deleteCar.mockImplementationOnce(() => { throw new Error(); });
    await carController.deleteCar(mockReq, mockRes);
    expect(mockRes.cookie).toHaveBeenCalledWith('message', 'Internal server error');
    expect(mockRes.redirect).toHaveBeenCalledWith('/admin/dashboard');
  });
});