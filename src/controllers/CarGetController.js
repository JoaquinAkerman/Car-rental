class CarGetController {
  /**
   * Handle the http request from the GET /cars endpoint and renders the index.html
   */
  constructor(CarGetService) {
    this.CarGetService = CarGetService;
  }
  getCars(req, res) {
    this.CarGetService.getAllCars((err, cars) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Internal server error - 500 - GET /cars failed");
        return;
      }

      res.render("index.html", { cars });
    });
  }
}

export default CarGetController;
