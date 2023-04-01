
declare namespace Cypress {
  interface Chainable {
    /**
     * Generates a random float between the given min and max values.
     * @param min - The minimum value (inclusive)
     * @param max - The maximum value (exclusive)
     * @returns A Chainable with the generated float value.
     */
    randomFloat(min: number, max: number): Chainable<number>;
  }
}

Cypress.Commands.add('randomFloat', (min: number, max: number) => {
  const randomFloat = Math.random() * (max - min) + min;
  const roundedFloat = parseFloat(randomFloat.toFixed(4));
  return cy.wrap(roundedFloat);
});