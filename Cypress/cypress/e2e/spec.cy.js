/// <reference types="cypress" />

describe("Ecommerce Site Tests", () => {
  beforeEach(() => {
    cy.visit("https://ecommerce-playground.lambdatest.io/");
  });

  it("Add To Cart", () => {
    cy.contains("Components").click({ force: true });
    cy.contains("iPhone").click({ force: true });
    cy.contains("Buy").click({ force: true });
    cy.contains("iPhone");
  });
});
