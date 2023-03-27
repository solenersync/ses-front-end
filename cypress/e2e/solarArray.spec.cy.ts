import { LoginPage } from '../pages/loginPage';
import { SolarArrayPage } from '../pages/solarArrayPage';
import { IUser } from '../types/IUser';

describe('solar array', () => {

  const testUserEmail = Cypress.env('TEST_USER_EMAIL')
  const testUserPassword = Cypress.env('TEST_USER_PASSWORD')
  const testUserName = Cypress.env('TEST_USER_NAME')
  const user: IUser = { email: testUserEmail, password: testUserPassword, name: testUserName };
  const loginPage: LoginPage = new LoginPage();
  let randomNum: number;

  beforeEach(() => {
    LoginPage.open();
  });

  it('should update solar array details', () => {
    cy.randomFloat(-180, 180).then((random) => {
      randomNum = random;

      loginPage 
      .enterEmail(user)
      .enterPassword(user)
      .clickSigninButton()
      .clickSolarArrayButton()
      .clickEditButton()
      .updateLongitude(randomNum)
      .clickSaveButton()
      .checkLongitude(randomNum)
    })

  })
})