/* global cy */

describe("Admin Dashboard Test", () => {
  // Reset the test database before each test
  beforeEach(() => {
    cy.exec("node ./cypress/e2e/tests/testUtils/resetDatabase.js");
  });

  it("It should not login with incorrect credentials", () => {
    cy.visit("http://localhost:3000/");
    cy.get('input[id="username"]').type("wrongusername");
    cy.get('input[id="password"]').type("wrongpassword");
    cy.get('input[type="submit"][value="Login"]').click();
    cy.url().should("eq", "http://localhost:3000/");
    cy.get(".notification.is-danger").should("exist").and("contain", "Invalid username or password");
  });

  it("It should visit the login page", () => {
    cy.visit("http://localhost:3000/");
    cy.url().should("eq", "http://localhost:3000/");
    cy.get("nav").should("exist");
    cy.get("strong").should("exist");
    cy.get("strong").should("have.text", "Home");
    cy.get('a.navbar-item[href="/cars"]').should("have.text", "Cars");
    cy.get("h1").should("have.text", "Car Rental");
    cy.get('input[id="username"]').should("exist");
    cy.get('input[id="password"]').should("exist");
    cy.get('input[type="submit"][value="Login"]').should("exist");
  });

  it("It should login and render the admin dashboard", () => {
    cy.visit("http://localhost:3000/");
    cy.get('input[id="username"]').type("admin");
    cy.get('input[id="password"]').type("admin");
    cy.get('input[type="submit"][value="Login"]').click();
    cy.url().should("eq", "http://localhost:3000/admin/dashboard");
    cy.get("h1").should("have.text", "Car Rental");
    cy.get("h2").should("contain", "Dashboard");
    cy.get("h2").should("contain", "Cars");
  });

  it("It should add several cars, edit them, and then delete them", () => {
    //if you want to add more cars, change the number of cars here
    //limit is 50 cars because the redirection limit is 50 on cypress.config.js

    const numberOfCars = 3;
    cy.visit("http://localhost:3000/admin/dashboard");

    // Add cars
    for (let i = 0; i < numberOfCars; i++) {
      cy.contains("Add New Car").click();
      cy.url().should("include", "http://localhost:3000/admin/add");
      cy.get('input[id="brand"]').type(`Test Brand ${i}`);
      cy.get('input[id="model"]').type(`Test ${i}`);
      cy.get('input[id="day_price"]').type(150);
      cy.contains("Add Car").click();
      cy.contains(".notification.is-primary", "Car saved successfully");
    }

    // Edit cars
    for (let i = 0; i < numberOfCars; i++) {
      cy.get(`a[data-edit="Test Brand ${i}"]`).click();
      cy.get('input[id="brand"]').clear().type(`Edited Test Brand ${i}`);
      cy.get('input[id="model"]').clear().type(`Edited Test ${i}`);
      cy.get('input[id="day_price"]').clear().type(200);
      cy.contains("Save Changes").click();
      cy.contains(".notification.is-primary", "Car updated successfully");
    }

    // Delete cars
    for (let i = 0; i < numberOfCars; i++) {
      cy.get(`input[data-delete="Edited Test Brand ${i}"]`).click();
      cy.contains(".notification.is-primary", "Car deleted successfully");
    }
  });

  it("should check if the example cars are in the database", () => {
    cy.visit("http://localhost:3000/admin/dashboard");

    // Check for the Toyota car details
    cy.get('.box.has-background-white-ter[data-id="1"]').then(($box) => {
      const box = cy.wrap($box);
      console.log("box is:", box);

      box.get("p").should("contain", "Brand: Toyota Test database");
      box.get("p").should("contain", "Model: Corolla Test");
      box.get("p").should("contain", "Day price: 200");
      box.get("p").should("contain", "Year: 2022");
      box.get("p").should("contain", "Mileage: 15000");
      box.get("p").should("contain", "Colors: Blue");
      box.get("p").should("contain", "Air conditioning: Yes");
      box.get("p").should("contain", "Passengers: 5");
      box.get("p").should("contain", "Transmission: Automatic");
      box.get("p").should("contain", "Panoramic sunroof: yes");
    });

    // Check for the Honda car details
    cy.get('.box.has-background-white-ter[data-id="2"]').then(($box) => {
      const box = cy.wrap($box);

      box.get("p").should("contain", "Brand: Honda Test Database");
      box.get("p").should("contain", "Model: Civic Test");
      box.get("p").should("contain", "Day price: 150");
      box.get("p").should("contain", "Year: 2021");
      box.get("p").should("contain", "Mileage: 20000");
      box.get("p").should("contain", "Colors: Gray");
      box.get("p").should("contain", "Air conditioning: Yes");
      box.get("p").should("contain", "Passengers: 4");
      box.get("p").should("contain", "Transmission: Manual");
      box.get("p").should("contain", "Panoramic sunroof: No");
    });

    // Check for the Ford car details
    cy.get('.box.has-background-white-ter[data-id="3"]').then(($box) => {
      const box = cy.wrap($box);

      box.get("p").should("contain", "Brand: Ford Test Database");
      box.get("p").should("contain", "Model: Mustang Test");
      box.get("p").should("contain", "Day price: 250");
      box.get("p").should("contain", "Year: 2023");
      box.get("p").should("contain", "Mileage: 5000");
      box.get("p").should("contain", "Colors: Red");
      box.get("p").should("contain", "Air conditioning: Yes");
      box.get("p").should("contain", "Passengers: 4");
      box.get("p").should("contain", "Transmission: Automatic");
      box.get("p").should("contain", "Panoramic sunroof: No");
    });
  });
});
