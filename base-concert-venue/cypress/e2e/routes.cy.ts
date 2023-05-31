import { generateNewBand } from "../../__tests__/__mocks__/fakeData/newBand";
import { generateRandomId } from "../../lib/features/reservations/utils";

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

// failure
it("displays correct band name for band route that existed at build time", () => {
  cy.task("db:reset").visit("/bands/1");
  cy.contains(/Shamrock Pete/i).should("exist");
});

it("displays error message for band route that not existed at build time", () => {
  cy.task("db:reset").visit("/bands/12345");
  cy.contains(/error: band not found/i).should("exist");
});

// failure
it("displays name for band that was not present at build time", () => {
  const bandId = generateRandomId();
  const newBand = generateNewBand(bandId);
  cy.task("db:reset").task("addBand", newBand).visit(`bands/${bandId}`);
  cy.contains(/Avalanche of Cheese/i).should("exist");
});
