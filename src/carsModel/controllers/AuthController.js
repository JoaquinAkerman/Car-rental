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

    res.render("login", { message, loggedIn: req.session.admin });
  }

  handleLoginFormSubmission(req, res) {
    const { username, password } = req.body;

    if (this.authService.validateUser(username, password)) {
      req.session.admin = true;
      res.redirect("/admin/dashboard");
    } else {
      res.cookie("message", "Invalid username or password", { maxAge: 1000 });

      res.redirect("/");
    }
  }

  async logout(req, res) {
    req.session.destroy(err => {
      if (err) {
        return res.redirect('/admin/dashboard');
      }
  
      res.clearCookie('sid');
      res.redirect('/');
    });
  }

  registerRoutes(app) {
    app.get("/", (req, res) => this.renderLoginView(req, res));
    app.post("/", (req, res) => this.handleLoginFormSubmission(req, res));
    app.post("/logout", (req, res) => this.logout(req, res));
  }
}

export default AuthController;
