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

  async renderEditCarView(req, res) {
    try {
      const id = req.params.id;
      const car = await this.CarGetService.getCarById(id);
      if (car) {
        res.render("admin/edit_car", { car });
      } else {
        res.status(404).send("Car not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).render("error", { error });
    }
  }

  registerRoutes(app) {
    app.get("/cars", (req, res) => this.renderCarsView(req, res));
    app.get("/admin/dashboard", (req, res) => this.renderAdminView(req, res));
    app.get("/admin/edit/:id", (req, res) => this.renderEditCarView(req, res));
  }
}

export default CarController;
