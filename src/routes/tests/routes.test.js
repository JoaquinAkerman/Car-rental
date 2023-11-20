import express from "express";
import registerRoutes from "../routes.js";

const controller1 = {
  registerRoutes: jest.fn(),
};

const controller2 = {
  registerRoutes: jest.fn(),
};

const app = express();

describe("registerRoutes", () => {
  beforeEach(() => {
    controller1.registerRoutes.mockReset();
    controller2.registerRoutes.mockReset();
  });

  it("should call registerRoutes for each controller", () => {
    const controllers = [controller1, controller2];
    registerRoutes(app, controllers);

    expect(controller1.registerRoutes).toHaveBeenCalledWith(app);
    expect(controller2.registerRoutes).toHaveBeenCalledWith(app);
  });

  it("should not call registerRoutes if controllers array is empty", () => {
    const controllers = [];
    registerRoutes(app, controllers);

    expect(controller1.registerRoutes).not.toHaveBeenCalled();
    expect(controller2.registerRoutes).not.toHaveBeenCalled();
  });
});
