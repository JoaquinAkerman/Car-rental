class CarController {
  /**
   * Initializes the constructor with the provided services.
   *
   * @param {CarGetService} CarGetService - The service for getting car information.
   * @param {AuthenticationService} AuthenticationService - The service for user authentication.
   * @param {CarUpdateService} CarUpdateService - The service for updating car information.
   */

  constructor(CarGetService, AuthenticationService, CarUpdateService) {
    this.CarGetService = CarGetService;
    this.AuthenticationService = AuthenticationService;
    this.CarUpdateService = CarUpdateService;
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
    const message = req.cookies.message;
    res.clearCookie("message");

    try {
      const cars = await this.CarGetService.getAllCars();
      res.render("admin/dashboard", { cars, message });
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

  async updateCar(req, res) {
    try {
      const id = req.params.id;
      const newCarData = req.body;

      await this.CarUpdateService.updateCar(id, newCarData);

      res.cookie("message", "Car updated successfully");
      res.redirect("/admin/dashboard");
    } catch (error) {
      console.error(error);
      res.cookie("message", "Internal server error");
      res.redirect("/admin/dashboard");
    }
  }
  registerRoutes(app) {
    app.get("/cars", (req, res) => this.renderCarsView(req, res));
    app.get("/admin/dashboard", (req, res) => this.renderAdminView(req, res));
    app.get("/admin/edit_car/:id", (req, res) =>
      this.renderEditCarView(req, res)
    );
    app.put("/cars/:id", (req, res) => this.updateCar(req, res));
  }
}

export default CarController;
