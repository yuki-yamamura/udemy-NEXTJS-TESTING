import { render, screen, within } from "@testing-library/react";

import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import BandPage from "@/pages/bands/[bandId]";

test("band page displays correct band information", async () => {
  const { fakeBands } = await readFakeData();
  render(<BandPage band={fakeBands[0]} error={null} />);

  const heading = screen.getByRole("heading", {
    name: /the wandering bunnies/i,
  });

  expect(heading).toBeInTheDocument();
});

test("band page displays error message if error happened", () => {
  render(<BandPage band={null} error="No such a band" />);

  const alert = screen.getByRole("alert");
  const errorMessage = within(alert).getByRole("heading", {
    name: /no such a band/i,
  });

  expect(errorMessage).toBeInTheDocument();
});
