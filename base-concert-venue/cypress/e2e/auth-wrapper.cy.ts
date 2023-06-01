it("runs auth flow for successful login to protect reservations page", () => {
  cy.task("db:reset").visit("/reservations/0");

  cy.findByRole("heading", { name: /sign in to your account/i }).should(
    "exist"
  );
  cy.findByRole("button", { name: /purchase/i }).should("not.exist");

  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("TEST_USER_EMAIL"));
  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env("TEST_PASSWORD"));
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  cy.findByRole("heading", { name: /the wandering bunnies/i }).should("exist");
  cy.findByRole("button", { name: /purchase/i }).should("exist");
  cy.findByRole("button", { name: Cypress.env("TEST_USER_EMAIL") }).should(
    "exist"
  );
  cy.findByRole("button", { name: /sign out/i }).should("exist");
  cy.findByRole("button", { name: /sign in/i }).should("not.exist");
});

it("runs auth flow for fail login", () => {
  cy.task("db:reset").visit("/user");

  cy.findByRole("heading", { name: /sign in to your account/i }).should(
    "exist"
  );
  cy.findByRole("heading", { name: /welcome/i }).should("not.exist");

  // type correct email and incorrect password so signing in will fail.
  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("TEST_USER_EMAIL"));
  cy.findByLabelText(/password/i)
    .clear()
    .type("password");
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  cy.findByText(/sign in failed/i).should("exist");
  cy.findByRole("heading", { name: /welcome/i }).should("not.exist");

  // type correct both email and password so signing in will success.
  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("TEST_USER_EMAIL"));
  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env("TEST_PASSWORD"));
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  const userPageUrl = `${Cypress.config("baseUrl")}/user`;
  cy.url().should("equal", userPageUrl);
  cy.findByRole("heading", {
    name: /welcome test@test.test/i,
  }).should("exist");

  cy.findByRole("heading", {
    name: new RegExp(`welcome ${Cypress.env("TEST_USER_EMAIL")}`, "i"),
  }).should("exist");
  cy.findByRole("button", { name: Cypress.env("TEST_USER_EMAIL") }).should(
    "exist"
  );
  cy.findByRole("button", { name: /sign out/i }).should("exist");
  cy.findByRole("button", { name: /sign in/i }).should("not.exist");
});

it("redirects to sign-in for protected pages", () => {
  cy.fixture("protected-pages.json").then((urls: string[]) => {
    urls.forEach((url) => {
      cy.visit(url);
      cy.findByLabelText(/email address/i).should("exist");
      cy.findByLabelText(/password/i).should("exist");
    });
  });
});

it("does not show sign-in when already signed in", () => {
  cy.task("db:reset").signIn(
    Cypress.env("TEST_USER_EMAIL"),
    Cypress.env("TEST_PASSWORD")
  );

  // visit protected page, then pass through sign-in flow.
  cy.visit("/reservations/0");
  cy.findByRole("heading", { name: /sign in to your account/i }).should(
    "not.exist"
  );
  cy.findByRole("button", { name: /purchase/i }).should("exist");
});

it("shows protected user pages when already signed in", () => {
  cy.task("db:reset").signIn(
    Cypress.env("TEST_USER_EMAIL"),
    Cypress.env("TEST_PASSWORD")
  );

  cy.visit("/user");

  cy.findByRole("button", { name: /purchase more tickets/i }).click();

  cy.findByRole("heading", { name: /upcoming shows/i }).should("exist");
});
