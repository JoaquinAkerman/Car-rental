const BASE_URL = Cypress.env("BASE_URL");
const TEST_PORT = Cypress.env("TEST_PORT");
describe("Admin Dashboard Test", () => {
  // Reset the test database before each test
  beforeEach(() => {
    cy.exec("node ./cypress/e2e/tests/testUtils/resetDatabase.js");
  });

  it("It should login and render the admin dashboard", () => {
    cy.visit(`http://localhost:${TEST_PORT}/`);
    cy.get('a.button.is-primary.mt-3:contains("Login as Admin")').should(
      "exist"
    );
    cy.get('a.button.is-primary.mt-3:contains("Login as Admin")').click();

    cy.url().should("eq", `${BASE_URL}${TEST_PORT}/admin/dashboard`);
    cy.get("h1").should("have.text", "Car Rental");
    cy.get("h2").should("contain", "Dashboard");
    cy.get("h2").should("contain", "Cars");
  });
  it("It should add several cars, edit them, and then delete them", () => {
    //if you want to add more cars, change the number of cars here
    //limit is 50 cars because the redirection limit is 50 on cypress.config.js

    //Login to admin dashboard
    cy.visit(`${BASE_URL}${TEST_PORT}`);
    cy.get('a.button.is-primary.mt-3:contains("Login as Admin")').should(
      "exist"
    );
    cy.get('a.button.is-primary.mt-3:contains("Login as Admin")').click();
    cy.url().should("eq", `${BASE_URL}${TEST_PORT}/admin/dashboard`);
    const numberOfCars = 3;

    // Add cars
    for (let i = 1; i < numberOfCars; i++) {
      cy.contains("Add New Car").click();
      cy.url().should("include", `${BASE_URL}${TEST_PORT}/admin/add`);
      cy.get('input[id="brand"]').type(`Test Brand ${i}`);
      cy.get('input[id="model"]').type(`Test ${i}`);
      cy.get('input[id="day_price"]').type(150);
      cy.get('input[id="color"]').type(`Test Color ${i}`);
      cy.contains("Add Car").click();
      cy.contains(".notification.is-primary", "Car saved successfully");
    }

    // Edit cars
    for (let i = 1; i < numberOfCars; i++) {
      cy.get(`a[data-edit="${i}"]`).click();
      cy.get('input[id="brand"]').clear().type(`Edited Test Brand ${i}`);
      cy.get('input[id="model"]').clear().type(`Edited Test ${i}`);
      cy.get('input[id="day_price"]').clear().type(200);
      cy.get('input[id="color"]').clear().type(`Edited Test Color ${i}`);
      cy.contains("Save Changes").click();
      cy.contains(".notification.is-primary", "Car updated successfully");
    }

    // Delete cars
    for (let i = 1; i < numberOfCars; i++) {
      cy.get(`input[data-delete="${i}"]`).click();
      cy.contains(".notification.is-primary", "Car deleted successfully");
    }
  });

  it("should check if the example cars are in the database", () => {
    cy.visit(`${BASE_URL}${TEST_PORT}`);

    cy.get('a.button.is-link.mt-3:contains("View Cars")')
      .should("exist")
      .click();
    cy.url().should("eq", `${BASE_URL}${TEST_PORT}/cars`);
    //check if the cars are rendered
    cy.get(".box").should("have.length", 3);

    // Check for the Toyota car details
    cy.get('.box[data-id="1"]').then(($box) => {
      const box = cy.wrap($box);

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
    cy.get('.box[data-id="2"]').then(($box) => {
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
    cy.get('.box[data-id="3"]').then(($box) => {
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

    cy.get('a.navbar-item.ml-5:contains("Home")').click();
    cy.url().should("eq", `${BASE_URL}${TEST_PORT}/`);
  });
});
