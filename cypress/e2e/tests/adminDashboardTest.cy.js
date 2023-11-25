/* global cy */

describe("My Tests", () => {
  // Reset the test database before each test
  beforeEach(() => {
    cy.exec("node ./cypress/e2e/tests/testUtils/resetDatabase.js");
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
    //limit is 50 cars
    const numberOfCars = 15;
    cy.visit("http://localhost:3000/admin/dashboard");

    // Add cars
    for (let i = 0; i < numberOfCars; i++) {
      cy.contains("Add New Car").click();
      cy.url().should('include', 'http://localhost:3000/admin/add');
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
});
