class CarController {
  constructor(CarGetService, AuthenticationService) {
    this.CarGetService = CarGetService;
    this.authService = AuthenticationService;
  }

  async renderCarsView(req, res) {
    try {
      const cars = await this.CarGetService.getAllCars();
      res.render("index", { cars });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

async renderAdminView(req, res) {
  try {
    const cars = await this.CarGetService.getAllCars();
    res.render("admin/dashboard", { cars });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

  registerRoutes(app) {
    app.get("/cars", (req, res) => this.renderCarsView(req, res));
    app.get("/admin/dashboard", (req, res) => this.renderAdminView(req, res));
  }
}

export default CarController;
//
