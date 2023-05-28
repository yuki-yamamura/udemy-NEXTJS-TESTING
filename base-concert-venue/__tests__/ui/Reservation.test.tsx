import { render, screen } from "@testing-library/react";

import { Reservation } from "@/components/reservations/Reservation";

test("reservation page shows correct number of available seats", async () => {
  render(<Reservation showId={12345} submitPurchase={jest.fn()} />);

  const availableSeatsCount = await screen.findByText(/10 seats left/i);

  expect(availableSeatsCount).toBeInTheDocument();
});
