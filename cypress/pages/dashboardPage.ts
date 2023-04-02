import { LoginPage } from './loginPage';
import { SolarArrayPage } from './solarArrayPage';

export class DashboardPage {
  //elements
  getLogoutButton() { return cy.contains('Logout') }
  getSolarArrayButton() { return cy.contains('Solar Array') }

  //actions
  clickLogoutButton(): LoginPage {
    this.getLogoutButton().click();
    return new LoginPage();
  }

  clickSolarArrayButton(): SolarArrayPage {
    this.getSolarArrayButton().click();
    return new SolarArrayPage();
  }

  //assertions
  checkUrl() { return cy.url().should('include', '/dashboard') }
}