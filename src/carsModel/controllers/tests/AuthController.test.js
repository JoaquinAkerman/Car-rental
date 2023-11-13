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
    const req = {};
    const res = { render: jest.fn() };

    authController.renderLoginView(req, res);

    expect(res.render).toHaveBeenCalledWith("login");
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
    const res = { redirect: jest.fn() };
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

  test("GET / should render login view", async () => {
    const res = { render: jest.fn() };
    authController.renderLoginView({}, res);
    expect(res.render).toHaveBeenCalledWith("login");
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
