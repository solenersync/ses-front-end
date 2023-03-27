export class LandingPage {

  checkUrl() { return cy.url().should('include', '/dashboard') }

}