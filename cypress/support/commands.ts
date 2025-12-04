/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      getBySel(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('getBySel', (selector) => {
  return cy.get(`[data-cy=${selector}]`);
});

export {};
