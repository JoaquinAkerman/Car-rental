const BASE_URL = Cypress.env("BASE_URL");
const TEST_PORT = Cypress.env("TEST_PORT");

describe("Cars View Test", () => {
  // Reset the test database before each test
  beforeEach(() => {
    cy.exec("node ./cypress/e2e/tests/testUtils/resetDatabase.js");
  });

  it("It should show the cars from test database", () => {
    cy.visit(`${BASE_URL}${TEST_PORT}`);
    cy.get('a[id="view-cars-link"]').click();

    //check if the cars are rendered
    cy.get(".box.has-background-white-ter").should("have.length", 3);

    // Check for the Toyota car details
    cy.get('.box.has-background-white-ter[data-id="1"]').then(($box) => {
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
