import { describe } from "node:test";

describe('login', () => {
  it('should login', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('fubo@gmail.com')
    cy.get('input[name="password"]').type('fubo')
    cy.get('button').click()
    cy.url().should('include', '/dashboard')
  });
});