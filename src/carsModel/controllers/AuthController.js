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

 
  async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.redirect("/admin/dashboard");
      }

      res.clearCookie("sid");
      res.redirect("/");
    });
  }

  registerRoutes(app) {
    app.get("/", (req, res) => this.renderLoginView(req, res));
    app.post("/logout", (req, res) => this.logout(req, res));
  }
}

export default AuthController;
