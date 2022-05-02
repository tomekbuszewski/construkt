import { FE_TEST_IDS } from "@construct/frontend/fe-test-ids";

describe("[E2E] Frontend sanity test", () => {
  before(() => {
    cy.visit("/");
  });

  it("renders the companies", () => {
    cy.get(`[data-testid="${FE_TEST_IDS.COMPANIES_WRAPPER}"]`).should("exist");
  });

  it("filters by name", () => {
    cy.get(`[data-testid="${FE_TEST_IDS.SEARCH_INPUT}"]`).type("any-a");

    /**
     * I know I shouldn't wait, but rather check visibility of loaders,
     * but it works very fast and Cypress sometimes looses the loader before
     * it even appear.
     */
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);

    cy.get(`[data-testid="${FE_TEST_IDS.COMPANIES_WRAPPER}"]`)
      .get("li")
      .then((items) => {
        cy.wrap(items.length).should("be.lessThan", 5);
      });
  });

  it("filters by city", () => {
    cy.get("li").find("[data-city]").click();

    cy.get(`[data-testid="${FE_TEST_IDS.COMPANIES_WRAPPER}"]`)
      .get("li")
      .then((items) => {
        cy.wrap(items.length).should("be.lessThan", 5);
      });
  });

  it("filters by speciality", () => {
    cy.get("li").find("[data-spec]").first().click();

    cy.get(`[data-testid="${FE_TEST_IDS.COMPANIES_WRAPPER}"]`)
      .get("li")
      .then((items) => {
        cy.wrap(items.length).should("be.lessThan", 5);
      });
  });
});
