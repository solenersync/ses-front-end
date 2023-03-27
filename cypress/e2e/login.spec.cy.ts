import { LoginPage } from '../pages/loginPage';
import { IUser } from '../types/IUser';

describe('login', () => {

  const testUserEmail = Cypress.env('TEST_USER_EMAIL')
  const testUserPassword = Cypress.env('TEST_USER_PASSWORD')
  const testUserName = Cypress.env('TEST_USER_NAME')
  const user: IUser = { email: testUserEmail, password: testUserPassword, name: testUserName };
  const loginPage: LoginPage = new LoginPage();

  beforeEach(() => {
    LoginPage.open();
  });

  it('should open dashboard when user logs in', () => {
    loginPage
    .enterEmail(user)
    .enterPassword(user)
    .clickSigninButton()
    .checkUrl();
  })
})