describe("Visit enerCHy and navigate to map", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173");
    cy.wait(10);
    cy.document().trigger("wheel", { deltaY: 10 });
    cy.get("#content").should("have.css", "opacity", "1");
  });
});
