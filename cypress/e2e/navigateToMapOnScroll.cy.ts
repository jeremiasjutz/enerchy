describe("Visit enerCHy and navigate to map", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173");
    cy.wait(10);
    cy.document().trigger("touchstart", { touches: [{ clientY: 0 }] });
    cy.document().trigger("touchmove", { changedTouches: [{ clientY: 10 }] });
    cy.get("#content").should("have.css", "opacity", "1");
  });
});
