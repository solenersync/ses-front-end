import { SolarArrayDetailsPage } from './solarArrayDetailsPage';

export class SolarArrayPage {
   //elements
   getEditButton() { return cy.contains('Edit') }
   getLongitude() { return cy.contains('Longitude') }
 
   //actions
 
   static open(): SolarArrayPage {
     cy.visit('/solar-array');
     return new SolarArrayPage();
   }
 
   clickEditButton(): SolarArrayDetailsPage { 
     this.getEditButton().click();
     return new SolarArrayDetailsPage();
   } 
 
   //assertions
 
   checkUrl() { 
     return cy.url().should('include', '/solar-array') 
   }

   checkLongitude(randomNum: number): SolarArrayPage { 
    cy.contains(randomNum.toString());
     return new SolarArrayPage();
   }


}