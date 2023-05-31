it("skips client-side bundle, confirming bands from ISR cache", () => {
  // see: https://glebbahmutov.com/blog/ssr-e2e/#removing-application-bundle
  cy.request("/bands")
    .its("body")
    .then((html: string) => {
      // remove the scripts, so they don't start automatically.
      const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, "");
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cy.state("document").write(staticHtml);
    });
  // cy.findAllByText(/2022 apr 1[567]/i).should("have.length", 3);
  cy.get('[role="list"] > li').should("have.length", 3);
  cy.get('[role="list"]').within(() => {
    cy.findByRole("heading", { name: /the joyous nun riot/i });
    cy.findByRole("heading", { name: /shamrock pete/i });
    cy.findByRole("heading", { name: /the wandering bunnies/i });
  });
});
