import supertest from "supertest";
import express from "express";

import AuthController from "../AuthController";
import AuthenticationService from "../../servicesLayer/AuthenticationService";

describe("AuthController", () => {
  let authService;
  let authController;

  beforeEach(() => {
    authService = new AuthenticationService();
    authController = new AuthController(authService);
  });

  test("renderLoginView should render login view", () => {
    const req = { body: {}, cookies: {}, session: {} };
    const res = {
      cookie: jest.fn(),
      clearCookie: jest.fn(),
      redirect: jest.fn(),
      render: jest.fn(),
    };
    req.cookies.message = "Test message";

    authController.renderLoginView(req, res);

    expect(res.render).toHaveBeenCalledWith("login", {
      message: "Test message",
    });
  });

  test("handleLoginFormSubmission should validate user and redirect", () => {
    const req = { body: { username: "test", password: "test" }, session: {} };
    const res = { redirect: jest.fn() };
    authService.validateUser = jest.fn().mockReturnValue(true);

    authController.handleLoginFormSubmission(req, res);

    expect(authService.validateUser).toHaveBeenCalledWith("test", "test");
    expect(req.session.admin).toBe(true);
    expect(res.redirect).toHaveBeenCalledWith("/admin/dashboard");
  });

  test("handleLoginFormSubmission should redirect to / if validation fails", () => {
    const req = { body: { username: "test", password: "test" }, session: {} };
    const res = { redirect: jest.fn(), cookie: jest.fn() };
    authService.validateUser = jest.fn().mockReturnValue(false);

    authController.handleLoginFormSubmission(req, res);

    expect(authService.validateUser).toHaveBeenCalledWith("test", "test");
    expect(req.session.admin).toBeUndefined();
    expect(res.redirect).toHaveBeenCalledWith("/");
  });
});

describe("AuthController", () => {
  let authService;
  let authController;
  let app;

  beforeEach(() => {
    authService = new AuthenticationService();
    authController = new AuthController(authService);
    app = express();
    app.use(express.json());
    authController.registerRoutes(app);
  });

  it("should render login view", () => {
    const req = {
      session: {},
      cookies: {
        message: "Test message",
      },
    };
    const res = {
      render: jest.fn(),
      clearCookie: jest.fn(),
    };

    const authController = new AuthController();
    authController.renderLoginView(req, res);

    expect(res.render).toHaveBeenCalledWith("login", {
      message: "Test message",
      });
    });
    
  test("POST / should handle login form submission", async () => {
    const req = {
      body: { username: "admin", password: "password" },
      session: {},
    };
    const res = { redirect: jest.fn() };
    authService.validateUser = jest.fn().mockReturnValue(true);

    await supertest(app)
      .post("/")
      .send({ username: "admin", password: "password" });

    authController.handleLoginFormSubmission(req, res);
    expect(res.redirect).toHaveBeenCalledWith("/admin/dashboard");
  });
});


describe("AuthController logout", () => {
  let authController;
  let mockReq, mockRes;

  beforeEach(() => {
    authController = new AuthController();
    mockReq = {
      session: {
        destroy: jest.fn().mockImplementation((callback) => callback()),
      },
    };
    mockRes = {
      clearCookie: jest.fn(),
      redirect: jest.fn(),
    };
  });

  it("should logout a user and redirect to the home page", async () => {
    await authController.logout(mockReq, mockRes);
    expect(mockReq.session.destroy).toHaveBeenCalled();
    expect(mockRes.clearCookie).toHaveBeenCalledWith("sid");
    expect(mockRes.redirect).toHaveBeenCalledWith("/");
  });

  it("should handle errors and redirect to the dashboard", async () => {
    mockReq.session.destroy.mockImplementationOnce((callback) => callback(new Error()));
    await authController.logout(mockReq, mockRes);
    expect(mockRes.redirect).toHaveBeenCalledWith("/admin/dashboard");
  });
});


