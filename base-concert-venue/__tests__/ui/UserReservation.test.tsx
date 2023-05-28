import { render, screen } from "@testing-library/react";

import { UserReservations } from "@/components/user/UserReservations";

test("shows correct text with button when user have reservations", async () => {
  render(<UserReservations userId={1} />);

  const purchaseTicketsButton = await screen.findByRole("button", {
    name: /purchase more tickets/i,
  });

  expect(purchaseTicketsButton).toBeInTheDocument();
});
