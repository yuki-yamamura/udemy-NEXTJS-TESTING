import { defineConfig } from "cypress";

import { resetDB } from "./__tests__/__mocks__/db/utils/reset-db";
import { addBand } from "./lib/features/bands/queries";
import { Band } from "./lib/features/bands/types";

export default defineConfig({
  e2e: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        "db:reset": () => resetDB(),
        addBand: (newBand: Band) => addBand(newBand),
      });
    },
  },
});
