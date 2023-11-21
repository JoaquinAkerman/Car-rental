class AuthController {
  /**
   * Initializes a new instance of the AuthenticationService class.
   *
   * @param {AuthenticationService} AuthenticationService - The authentication service.
   */
  constructor(AuthenticationService) {
    this.authService = AuthenticationService;
  }

  renderLoginView(req, res) {
    const message = req.cookies.message;
    res.clearCookie("message");

    res.render("login", { message });
  }

  handleLoginFormSubmission(req, res) {
    const { username, password } = req.body;

    if (this.authService.validateUser(username, password)) {
      req.session.admin = true;
      res.redirect("/admin/dashboard");
    } else {
      res.cookie("message", "Invalid username or password!!!", { maxAge: 1000 });
      res.redirect("/");
    }
  }

  /**
   * Register the routes for the app.
   *
   * @param {Object} app - The Express app.
   */
  registerRoutes(app) {
    app.get("/", (req, res) => this.renderLoginView(req, res));
    app.post("/", (req, res) => this.handleLoginFormSubmission(req, res));
  }
}

export default AuthController;
