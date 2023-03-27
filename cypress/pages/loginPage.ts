import { IUser } from '../types/IUser';
import { DashboardPage } from './dashboardPage';

export class LoginPage {
  
  //elements
  getEmailInput() { return cy.get('[data-testid="email"]') }
  getPasswordInput() { return cy.get('[data-testid="password"]') }
  getSigninButton() { return cy.get('[data-testid="sign-in-button"]') }
  getError() { return cy.get('[data-testid="login-error-message"]')}

  //actions

  static open(): LoginPage {
    cy.visit('/login');
    return new LoginPage();
  }

  enterEmail(user: IUser): LoginPage { 
    this.getEmailInput().type(user.email);
    return new LoginPage();
  } 

  enterPassword(user: IUser): LoginPage { 
    this.getPasswordInput().type(user.password)
    return new LoginPage();
  } 

  clickSigninButton(): DashboardPage { 
    this.getSigninButton().click();
    return new DashboardPage();
  } 

  clickSigninButtonInvalidLogin(): LoginPage { 
    this.getSigninButton().click();
    return new LoginPage();
  } 

  //assertions

  checkUrl() { 
    return cy.url().should('include', '/login') 
  }

  checkErrorIsDisplayed(): LoginPage { 
    this.getError().contains('Invalid email or password. Please try again.');
    return new LoginPage;
  }
}