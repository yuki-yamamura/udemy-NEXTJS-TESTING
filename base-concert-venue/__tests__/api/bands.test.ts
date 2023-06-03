import { testApiHandler } from "next-test-api-route-handler";

import bandsHandler from "@/pages/api/bands";

test("POST /api/bands returns 401 status for invalid revalidation secret", async () => {
  await testApiHandler({
    handler: bandsHandler,
    params: { secret: "NOT THE REAL SECRET" },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          newBand: {
            id: 12345,
            name: "test",
            description: "test",
            image: {
              fileName: "test",
              authorName: "test",
              authorLink: "test",
            },
          },
        }),
      });
      expect(res.status).toBe(401);
    },
  });
});
