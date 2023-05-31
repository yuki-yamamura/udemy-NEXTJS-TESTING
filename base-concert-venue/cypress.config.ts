import { defineConfig } from "cypress";

import { resetDB } from "./__tests__/__mocks__/db/utils/reset-db";
import { addBand } from "./lib/features/bands/queries";
import { Band } from "./lib/features/bands/types";
import { addReservation } from "./lib/features/reservations/queries";
import { Reservation } from "./lib/features/reservations/types";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // eslint-disable-next-line no-param-reassign
      config.env.REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;
      on("task", {
        "db:reset": () => resetDB(),
        addBand: (newBand: Band) => addBand(newBand),
        addReservation: (newReservation: Reservation) =>
          addReservation(newReservation),
      });

      return config;
    },
  },
});
