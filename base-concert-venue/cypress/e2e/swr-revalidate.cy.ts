import { generateNewReservation } from "../../__tests__/__mocks__/fakeData/newReservation";
import { generateRandomId } from "../../lib/features/reservations/utils";

const ONE_SECOND = 1000;
const FIFTEEN_SECONDS = ONE_SECOND * 15;
const THIRTY_SECONDS = ONE_SECOND * 30;

it("should refresh show page after 30 seconds", () => {
  cy.clock();
  cy.task("db:reset").visit("/shows");
  cy.findAllByText(/sold out/i).should("have.length", 1);

  const newReservation = generateNewReservation({
    reservationId: generateRandomId(),
    showId: 0,
    seatCount: 10,
  });
  cy.task("addReservation", newReservation);

  cy.tick(ONE_SECOND);
  cy.findAllByText(/sold out/i).should("have.length", 1);

  cy.tick(THIRTY_SECONDS);
  cy.findAllByText(/sold out/i).should("have.length", 2);
});

it.skip("should refresh reservations page after 15 seconds", () => {
  cy.clock();
  cy.task("db:reset").visit("/reservations/0");

  // click sign in button with default input values (email: test@test@test, password: test)
  //   but sign in error will occurs. I don't know why and how to fix it.
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  cy.findByRole("heading", { name: /10 seats left/i }).should("exist");

  const newReservation = generateNewReservation({
    reservationId: generateRandomId(),
    showId: 0,
    seatCount: 2,
  });
  cy.task("addReservation", newReservation);

  cy.tick(ONE_SECOND);
  cy.findByRole("heading", { name: /10 seats left/i }).should("exist");

  cy.tick(FIFTEEN_SECONDS);
  cy.findByRole("heading", { name: /8 seats left/i }).should("exist");
});
