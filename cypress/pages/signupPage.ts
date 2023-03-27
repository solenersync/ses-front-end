import { IUser } from '../types/IUser';
import { DashboardPage } from './dashboardPage';

export class SignupPage {
  
  //elements
  getEmailInput() { return cy.get('#email') }
  getNameInput() { return cy.get('#name') }
  getPasswordInput() { return cy.get('#password') }
  getSignupButton() { return cy.contains('Sign up') }
  getError() { return cy.get('[data-testid="signup-error-message"]')}

  //actions

  static open(): SignupPage {
    cy.visit('/signup');
    return new SignupPage();
  }

  enterEmail(user: IUser): SignupPage { 
    this.getEmailInput().type(user.email);
    return new SignupPage();
  } 

  enterName(user: IUser): SignupPage { 
    this.getNameInput().type(user.name);
    return new SignupPage();
  } 


  enterPassword(user: IUser): SignupPage { 
    this.getPasswordInput().type(user.password)
    return new SignupPage();
  } 

  clickSignupButton(): SignupPage { 
    this.getSignupButton().click();
    return new SignupPage();
  } 

  //assertions

  checkUrl() { 
    return cy.url().should('include', '/signup') 
  }

  checkErrorIsDisplayed(): SignupPage { 
    this.getError().contains('User already exists. Please try again.');
    return new SignupPage;
  }
}