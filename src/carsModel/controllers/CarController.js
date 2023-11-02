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

  registerRoutes(app) {
    app.get("/cars", (req, res) => this.renderCarsView(req, res));
  }
}

export default CarController;
