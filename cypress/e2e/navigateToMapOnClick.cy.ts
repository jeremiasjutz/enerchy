describe("Visit enerCHy and navigate to map", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173");
    cy.wait(4500);
    cy.get("button").contains("Berglandschaft entdecken").click();
    cy.get("#content").should("have.css", "opacity", "1");
  });
});
