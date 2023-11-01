class CarGetController {
  constructor(carGetService) {
    this.carGetService = carGetService;
  }

  async getCars(req, res) {
    try {
      const cars = await this.carGetService.getAllCars();
      res.status(200).json(cars);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async renderCarsView(req, res) {
    try {
      const cars = await this.carGetService.getAllCars();
      res.render('index', { cars }); // 'index' is the name of the Nunjucks template
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  registerRoutes(app) {
    app.get('/cars', (req, res) => this.renderCarsView(req, res));
  }
}

export default CarGetController;