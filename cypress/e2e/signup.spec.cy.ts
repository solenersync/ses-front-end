import { SignupPage } from '../pages/signupPage';
import { IUser } from '../types/IUser';

describe('signup', () => {

  const user: IUser = { email: 'jd@test.com', password: 'secret26', name: 'John Doe' };
  const signupPage: SignupPage = new SignupPage();

  beforeEach(() => {
    cy.intercept(
      'POST',
      '/api/v1/users/user/create',
      {
        statusCode: 200,
        body: {
          id: 1,
          name: 'John Doe',
          email: 'jd@test.com',
        },
      }
    );

    SignupPage.open();
  });

  it('should fill in a sign up form', () => {
    signupPage
    .enterEmail(user)
    .enterName(user)
    .enterPassword(user)
    .checkUrl()
  })  
})