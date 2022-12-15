describe("Visit enerCHy and toggle controlpanel", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");
    cy.wait(4500);
    cy.get("button").contains("Berglandschaft entdecken").click();
    cy.get("#toggleControlPanelButton").click();
    cy.get("#controlPanel")
      .should("have.attr", "style")
      .should("contain", "translateX(-100%)");
  });
});
