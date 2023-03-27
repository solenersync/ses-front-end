import { LoginPage } from '../pages/loginPage';
import { IUser } from '../types/IUser';

describe('login', () => {

  const user: IUser = { email: 'cypress@test.com', password: 'cypresspassword', name: 'cypress' };
  var loginPage: LoginPage = new LoginPage();

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