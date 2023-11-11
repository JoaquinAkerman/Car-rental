class AuthenticationService {
  validateUser(username, password) {
    // Basic example for demo purposes; DB comparison will be added later
    return username === "admin" && password === "password";
  }
}

export default AuthenticationService;
