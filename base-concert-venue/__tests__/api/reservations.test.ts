import { testApiHandler } from "next-test-api-route-handler";

import { validateToken } from "@/lib/auth/utils";
import reservationsHandler from "@/pages/api/reservations/[reservationId]";
import userReservationsHandler from "@/pages/api/users/[userId]/reservations";

jest.mock("@/lib/auth/utils");

test("POST /api/reservations/[reservationId] adds reservation to database", async () => {
  // make a reservation for user-id 1
  await testApiHandler({
    handler: reservationsHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.reservationId = "12345";
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          showId: "2",
          userId: "1",
          seatCount: "20",
        }),
      });
      expect(res.status).toBe(201);
    },
  });

  // confirm there are three reservations for user-id 1 in database
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.userId = 1;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.userReservations).toHaveLength(3);
    },
  });
});

test("POST /api/reservations/[reservationId] returns 401 status when not authorized", async () => {
  (validateToken as jest.Mock).mockResolvedValue(false);
  await testApiHandler({
    handler: reservationsHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.reservationId = "12345";
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          showId: "2",
          userId: "1",
          seatCount: "20",
        }),
      });
      expect(res.status).toBe(401);
    },
  });
});
