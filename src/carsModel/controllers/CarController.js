class CarController {
  constructor(CarGetService) {
    this.CarGetService = CarGetService;
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

  renderLoginView(req, res) {
    res.render("login");
  }

  handleLoginFormSubmission(req, res) {
    const { username, password } = req.body;

    // Verify the username and password
    // Basic example for demo purposes; DB comparison will be added later
    if (username === "admin" && password === "password") {
      // Create a session for the administrator
      req.session.admin = true;

      // Redirect to the admin dashboard
      res.redirect("/admin/dashboard");
    } else {
      // If the username or password is incorrect, redirect back to the login page
      res.redirect("/");
    }
  }
  registerRoutes(app) {
    app.get("/cars", (req, res) => this.renderCarsView(req, res));
    app.get("/", (req, res) => this.renderLoginView(req, res));
    app.post("/", (req, res) => this.handleLoginFormSubmission(req, res));
  }
}

export default CarController;
//
