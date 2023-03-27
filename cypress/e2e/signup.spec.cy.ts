import { SignupPage } from '../pages/signupPage';
import { IUser } from '../types/IUser';

describe('signup', () => {

  const user: IUser = { email: 'cypress@test.com', password: 'cypresspassword', name: 'cypress' };
  var signupPage: SignupPage = new SignupPage();

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