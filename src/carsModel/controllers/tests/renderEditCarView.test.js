import CarController from "../CarController.js";

describe("CarController", () => {
  describe("renderEditCarView", () => {
    it("should render the edit car view with the car data", async () => {
      const CarGetService = {
        getCarById: jest.fn().mockResolvedValue({ id: 1, name: "Car 1" }),
      };
      const carController = new CarController(CarGetService);
      const req = {
        params: { id: 1 },
        cookies: {
          message: "Test message",
        },
      };
      const res = {
        render: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await carController.renderEditCarView(req, res);

      expect(CarGetService.getCarById).toHaveBeenCalledWith(req.params.id);
      expect(res.render).toHaveBeenCalledWith("admin/edit_car", {
        car: { id: 1, name: "Car 1" },
      });
    });

    it("should handle errors from the getCarById method", async () => {
      const CarGetService = {
        getCarById: jest.fn().mockRejectedValue(new Error("Error getting car")),
      };
      const carController = new CarController(CarGetService);
      const req = {
        params: { id: 1 },
        cookies: {
          message: "Test message",
        },
      };
      const res = {
        render: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await carController.renderEditCarView(req, res);

      expect(CarGetService.getCarById).toHaveBeenCalledWith(req.params.id);
      expect(res.render).toHaveBeenCalledWith("error", {
        error: new Error("Error getting car"),
      });
    });

    describe("CarController", () => {
      describe("renderEditCarView", () => {
        it("should respond with 404 when the car is not found", async () => {
          const CarGetService = {
            getCarById: jest.fn().mockResolvedValue(null),
          };
          const carController = new CarController(CarGetService);
          const req = {
            params: { id: 1 },
            cookies: {
              message: "Test message",
            },
          };
          const res = {
            render: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
          };

          await carController.renderEditCarView(req, res);

          expect(CarGetService.getCarById).toHaveBeenCalledWith(req.params.id);
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.send).toHaveBeenCalledWith("Car not found");
        });
      });
    });
  });
});
