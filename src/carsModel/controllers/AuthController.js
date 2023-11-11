class AuthController {
    constructor(AuthenticationService) {
      this.authService = AuthenticationService;
    }
  
    renderLoginView(req, res) {
      res.render("login");
    }
  
    handleLoginFormSubmission(req, res) {
      const { username, password } = req.body;
  
      if (this.authService.validateUser(username, password)) {
        req.session.admin = true;
        res.redirect("/admin/dashboard");
      } else {
        res.redirect("/");
      }
    }
  
    registerRoutes(app) {
      app.get("/", (req, res) => this.renderLoginView(req, res));
      app.post("/", (req, res) => this.handleLoginFormSubmission(req, res));
    }
  }
  
  export default AuthController;