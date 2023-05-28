import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import { filenames, writeJSONToFile } from "@/lib/db/db-utils";

export const resetDB = async (): Promise<void[]> => {
  const failsafe = process.env.NODE_ENV === "test";
  if (!failsafe) {
    // eslint-disable-next-line no-console
    console.log("WARNING: database reset unavailable outside test environment");
  }

  const { fakeBands, fakeReservations, fakeShows, fakeUsers } =
    await readFakeData();

  return Promise.all([
    writeJSONToFile(filenames.bands, fakeBands),
    writeJSONToFile(filenames.reservations, fakeReservations),
    writeJSONToFile(filenames.shows, fakeShows),
    writeJSONToFile(filenames.users, fakeUsers),
  ]);
};
