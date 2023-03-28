declare namespace Cypress {
  interface Chainable {
    /**
     * Generates a random float between the given min and max values.
     * @param min - The minimum value (inclusive)
     * @param max - The maximum value (exclusive)
     * @returns A Chainable with the generated float value.
     */
    randomFloat(min: number, max: number): Chainable<number>;
    mockLogin(user?: {id: number; name: string; email: string;}): Chainable<void>;
  }
}

Cypress.Commands.add('randomFloat', (min: number, max: number) => {
  const randomFloat = Math.random() * (max - min) + min;
  const roundedFloat = parseFloat(randomFloat.toFixed(4));
  return cy.wrap(roundedFloat);
});

Cypress.Commands.add('mockLogin', (user = null) => {
  cy.window().then((window) => {
    const defaultUser = {
      id: 1,
      name: 'John Doe',
      email: 'jd@test.com',
    };

    const userData = user || defaultUser;
    window.localStorage.setItem('session', JSON.stringify({ user: userData }));
  });
});