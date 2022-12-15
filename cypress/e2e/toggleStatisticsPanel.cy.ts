describe("Visit enerCHy and toggle statistics panel", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");
    cy.wait(4500);
    cy.get("button").contains("Berglandschaft entdecken").click();
    cy.get("#toggleStatisticsPanelButton").click();
    cy.get("#statisticsPanel").should("not.exist");
  });
});
