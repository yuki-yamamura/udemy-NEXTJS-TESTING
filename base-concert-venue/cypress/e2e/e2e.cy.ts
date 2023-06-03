it("purchasing tickets flow from sign in to sign out", () => {
  // visit shows page
  cy.task("db:reset").visit("/shows");

  // click button to purchase ticket
  cy.get('[data-cy="show-2"]').click();

  // auth page appears, so type email and password, then click sign-in button
  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("TEST_USER_EMAIL"));
  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env("TEST_PASSWORD"));
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  // check for band name and seats available
  cy.findByRole("heading", {
    name: /the joyous nun riot/i,
  }).should("exist");
  cy.findByText(/100 seats left/i).should("exist");

  // select 5 seats then click purchase button
  cy.findByRole("spinbutton").clear().type("5");
  cy.findByRole("button", { name: /purchase/i }).click();

  // check confirmation message
  cy.findByText(/5 seats confirmed/i);

  // visit reservations page again to confirm there are 95 seats available
  cy.visit("/shows");
  cy.get('[data-cy="show-2"]').click();
  cy.findByRole("heading", {
    name: /the joyous nun riot/i,
  }).should("exist");
  cy.findByText(/95 seats left/i).should("exist");

  // click sign-out button
  cy.findByRole("button", { name: /sign out/i }).click();

  // check there is not userinfo button
  cy.findByRole("button", { name: Cypress.env("TEST_USER_EMAIL") }).should(
    "not.exist"
  );
});
