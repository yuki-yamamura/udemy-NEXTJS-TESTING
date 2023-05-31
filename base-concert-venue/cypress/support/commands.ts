import "@testing-library/cypress/add-commands";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      resetDbAndIsrCache(): void;
    }
  }
}

Cypress.Commands.add("resetDbAndIsrCache", () => {
  cy.task("db:reset");
  const secret = Cypress.env("REVALIDATION_SECRET");
  cy.request("GET", `/api/revalidate?secret=${secret}`);
});
