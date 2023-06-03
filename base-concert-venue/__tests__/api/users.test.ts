import { testApiHandler } from "next-test-api-route-handler";

import { validateToken } from "@/lib/auth/utils";
import userAuthHandler from "@/pages/api/users";
import userReservationsHandler from "@/pages/api/users/[userId]/reservations";

jest.mock("@/lib/auth/utils");

test("POST /api/users receives token with correct credentials", async () => {
  await testApiHandler({
    handler: userAuthHandler,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: "test@test.test",
          password: "test",
        }),
      });
      expect(res.status).toBe(200);

      const {
        user: { id, email, token },
      } = await res.json();
      expect(id).toBe(1);
      expect(email).toBe("test@test.test");
      expect(token).not.toBeUndefined();
    },
  });
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
test("GET /api/users/[userId]/reservations returns correct number of reservations", async () => {
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
      expect(json.userReservations).toHaveLength(2);
    },
  });
});

test("GET /api/users/[userId]/reservations return an empty array if no reservations", async () => {
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.userId = 12345;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.userReservations).toHaveLength(0);
    },
  });
});

test("GET /api/users/[userId]/reservations return 401 status when not authorized", async () => {
  (validateToken as jest.Mock).mockResolvedValue(false);
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.userId = 1;
    },
    test: async ({ fetch }) => {
      const res = await fetch();
      expect(res.status).toBe(401);
    },
  });
});
