describe("Visit enerCHy and toggle about panel", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");
    cy.wait(4500);
    cy.get("button").contains("Berglandschaft entdecken").click();
    cy.get("#toggleAboutPanelButton").click();
    cy.get("#aboutPanel").contains("About");
    cy.get("#closeAboutPanelButton").click();
    cy.get("#aboutPanel").should("not.exist");
  });
});
