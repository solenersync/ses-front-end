import { LoginPage } from '../pages/loginPage';
import { SolarArrayPage } from '../pages/solarArrayPage';
import { IUser } from '../types/IUser';

describe('solar array', () => {

  const user: IUser = { email: 'cypress@test.com', password: 'cypresspassword', name: 'cypress' };
  var loginPage: LoginPage = new LoginPage();
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