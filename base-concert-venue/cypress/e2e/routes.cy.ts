describe("displays correct heading when navigating", () => {
  it("shows route", () => {
    cy.visit("/");

    cy.contains(/shows/i).click();
    cy.contains(/upcoming shows/i).should("exist");
  });

  it("bands route", () => {
    cy.visit("/");

    cy.contains(/bands/i).click();
    cy.contains(/our illustrious performers/i).should("exist");
  });
});
