import { generateNewBand } from "../../__tests__/__mocks__/fakeData/newBand";
import { generateNewShow } from "../../__tests__/__mocks__/fakeData/newShow";
import { generateRandomId } from "../../lib/features/reservations/utils";

it("should load refreshed page from cache after new band is added", () => {
  cy.task("db:reset").visit("/bands");
  cy.findByRole("heading", { name: /Avalanche of Cheese/i }).should(
    "not.exist"
  );

  const bandId = generateRandomId();
  const newBand = generateNewBand(bandId);
  const secret = Cypress.env("REVALIDATION_SECRET");

  cy.request("POST", `/api/bands?secret=${secret}`, { newBand }).then(
    (response) => {
      expect(response.body.revalidated).to.equal(true);
    }
  );

  cy.reload();
  cy.findByRole("heading", { name: /avalanche of cheese/i }).should("exist");

  // reset ISR cache to initial db conditions
  cy.resetDbAndIsrCache();
});

it("should load refreshed page after new show is added", () => {
  cy.task("db:reset").visit("/shows");
  cy.findByRole("heading", { name: /Avalanche of Cheese/i }).should(
    "not.exist"
  );

  const showId = generateRandomId();
  const newShow = generateNewShow(showId);
  const secret = Cypress.env("REVALIDATION_SECRET");
  cy.request("POST", `/api/shows?secret=${secret}`, { newShow }).then(
    (response) => {
      expect(response.body.revalidated).to.equal(true);
    }
  );

  cy.reload();
  cy.findByRole("heading", { name: /Avalanche of Cheese/i }).should("exist");

  cy.resetDbAndIsrCache();
});
