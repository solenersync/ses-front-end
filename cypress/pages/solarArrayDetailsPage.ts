import { SolarArrayPage } from './solarArrayPage';

export class SolarArrayDetailsPage {

   //elements
   getLongitude() { return cy.get('[data-testid="longitude"]') }
   getSaveButton() { return cy.get('[data-testid="save-button"]')}
 
   //actions
 
   updateLongitude(randomNum: number) : SolarArrayDetailsPage { 
     this.getLongitude().clear().type(randomNum.toString());
     return new SolarArrayDetailsPage();
   } 

   clickSaveButton(): SolarArrayPage {
    this.getSaveButton().click();
    return new SolarArrayPage();
  }

   //assertions
 
   checkUrl() { 
     return cy.url().should('include', '/solar-array') 
   }

}