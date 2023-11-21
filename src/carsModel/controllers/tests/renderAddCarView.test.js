import CarController from '../CarController.js';

describe('CarController', () => {
  let carController;
  let mockRes;

  beforeEach(() => {
    carController = new CarController();
    mockRes = {
      render: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it('should render the add car view', async () => {
    const mockReq = {};
    await carController.renderAddCarView(mockReq, mockRes);
    expect(mockRes.render).toHaveBeenCalledWith('admin/add_car');
  });

  it('should send a 500 error if an exception is thrown', async () => {
    const mockReq = {};
    mockRes.render.mockImplementationOnce(() => { throw new Error(); });
    await carController.renderAddCarView(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith('Internal server error');
  });
});