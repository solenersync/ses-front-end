import { SignupPage } from '../pages/signupPage';
import { IUser } from '../types/IUser';

describe('signup', () => {

  const testUserEmail = Cypress.env('TEST_USER_EMAIL')
  const testUserPassword = Cypress.env('TEST_USER_PASSWORD')
  const testUserName = Cypress.env('TEST_USER_NAME')
  const user: IUser = { email: testUserEmail, password: testUserPassword, name: testUserName };
  const signupPage: SignupPage = new SignupPage();

  beforeEach(() => {
    SignupPage.open();
  });

  it('should return an error when attempting to signup with existing user', () => {
    signupPage
    .enterEmail(user)
    .enterName(user)
    .enterPassword(user)
    .clickSignupButton()
    .checkErrorIsDisplayed() ;
  })  
})