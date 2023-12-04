class CarController {
  /**
   * Initializes the constructor with the provided services.
   *
   * @param {CarGetService} CarGetService - The service for getting car information.
   * @param {AuthenticationService} AuthenticationService - The service for user authentication.
   * @param {CarUpdateService} CarUpdateService - The service for updating car information.
   * @param {CarValidator} CarValidator - The validator for car information.
   */

  constructor(
    CarGetService,
    AuthenticationService,
    CarUpdateService,
    CarValidator
  ) {
    this.CarGetService = CarGetService;
    this.AuthenticationService = AuthenticationService;
    this.CarUpdateService = CarUpdateService;
    this.CarValidator = CarValidator;
  }

  ensureLoggedIn(req, res, next) {
    console.log("Checking if user is logged in");

    if (req.isAuthenticated()) {
      console.log("User is authenticated");
      return next();
    }

    console.log("User is not authenticated, redirecting to login page");
    res.redirect("/login");
  }

  async renderCarsView(req, res) {
    try {
      const cars = await this.CarGetService.getAllCars();
      res.render("cars", { cars });
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
      res.render("admin/dashboard", { cars, message, req });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  async renderAddCarView(req, res) {
    try {
      res.render("admin/add_car");
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
      this.CarValidator(newCarData);

      await this.CarUpdateService.updateCar(id, newCarData);

      res.cookie("message", "Car updated successfully");
      res.redirect("/admin/dashboard");
    } catch (error) {
      console.error(error);
      res.cookie("message", "Internal server error");
      res.redirect("/admin/dashboard");
    }
  }

  async deleteCar(req, res) {
    try {
      const id = req.params.id;

      await this.CarUpdateService.deleteCar(id);

      res.cookie("message", "Car deleted successfully");
      res.redirect("/admin/dashboard");
    } catch (error) {
      console.error(error);
      res.cookie("message", "Internal server error");
      res.redirect("/admin/dashboard");
    }
  }

  async createCar(req, res) {
    try {
      const carData = req.body;
      console.log(carData);
      this.CarValidator(carData);
      await this.CarUpdateService.createCar(carData);

      res.cookie("message", "Car saved successfully", {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      res.redirect(`/admin/dashboard`);
    } catch (error) {
      res.cookie("message", "Internal server error" + error, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      res.redirect(`/admin/dashboard`);
    }
  }
  registerRoutes(app) {
    app.get("/cars", (req, res) => this.renderCarsView(req, res));
    app.all("/admin/*", (req, res, next) =>
      this.ensureLoggedIn(req, res, next)
    );
    app.get("/admin/dashboard", (req, res) => this.renderAdminView(req, res));
    app.get("/admin/edit_car/:id", (req, res) =>
      this.renderEditCarView(req, res)
    );
    app.get("/admin/add", (req, res) => this.renderAddCarView(req, res));
    app.patch("/admin/edit_car/:id", (req, res) => this.updateCar(req, res));
    app.post("/admin/add", (req, res) => this.createCar(req, res));
    app.delete("/admin/delete/:id", (req, res) => this.deleteCar(req, res));
  }
}
//
export default CarController;
