import { testApiHandler } from "next-test-api-route-handler";

import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import showsHandler from "@/pages/api/shows";
import showIdHandler from "@/pages/api/shows/[showId]";

test("GET /api/shows returns shows from database", async () => {
  await testApiHandler({
    handler: showsHandler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);
      const json = await res.json();

      const { fakeShows } = await readFakeData();
      expect(json).toEqual({ shows: fakeShows });
    },
  });
});

test("GET /api/shows/[showId] returns the data for the correct show id", async () => {
  await testApiHandler({
    handler: showIdHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.showId = 0;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);
      const json = await res.json();

      const { fakeShows } = await readFakeData();
      expect(json).toEqual({ show: fakeShows[0] });
    },
  });
});

test("POST /api/shows returns 401 status for invalid revalidation secret", async () => {
  await testApiHandler({
    handler: showsHandler,
    params: { secret: "NOT THE REAL SECRET" },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "POST" });
      expect(res.status).toBe(401);
    },
  });
});
