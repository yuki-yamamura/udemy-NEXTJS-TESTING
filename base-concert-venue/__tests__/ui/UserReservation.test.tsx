import { render, screen } from "@testing-library/react";

import { UserReservations } from "@/components/user/UserReservations";

test("shows correct text with button when user has reservations", async () => {
  render(<UserReservations userId={1} />);

  const purchaseTicketsButton = await screen.findByRole("button", {
    name: /purchase more tickets/i,
  });

  expect(purchaseTicketsButton).toBeInTheDocument();
});

test('shows correct text with button and no "your tickets" heading when user has no reservation', async () => {
  render(<UserReservations userId={0} />);

  const purchaseTicketsButton = await screen.findByRole("button", {
    name: /purchase tickets/i,
  });
  const yourTicketsHeading = screen.queryByRole("heading", {
    name: /your tickets/i,
  });

  expect(purchaseTicketsButton).toBeInTheDocument();
  expect(yourTicketsHeading).not.toBeInTheDocument();
});
