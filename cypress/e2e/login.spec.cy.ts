import { LoginPage } from '../pages/loginPage';
import { IUser } from '../types/IUser';

describe('Login', () => {

  const user: IUser = { email: 'jd@test.com', password: 'secret26', name: 'John Doe' };
  var loginPage: LoginPage = new LoginPage();

  beforeEach(() => {
    cy.visit('/login');
  });

  it('should open dashboard when user logs in', () => {
    loginPage
      .enterEmail(user)
      .enterPassword(user)
      .clickSigninButton()
      .checkUrl();
  })
});
