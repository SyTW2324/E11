describe('login', () => {
  it('should login', () => {
    cy.intercept('POST', 'http://localhost:5000/login').as('loginRequest')
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('fubo@gmail.com')
    cy.get('input[name="password"]').type('fubo')
    cy.get('button').click()
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200)
    cy.url().should('include', '/home')
  });
  it('should fail - email format', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('notemail')
    cy.get('input[name="password"]').type('notpassword')
    cy.get('button').click()
    cy.url().should('include', '/login')

  });
  it('should fail - incorrect password', () => {
    cy.intercept('POST', 'http://localhost:5000/login').as('loginRequest')
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('fubo@gmail.com')
    cy.get('input[name="password"]').type('notpassword')
    cy.get('button').click()
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 401)
  });
  it('should fail - incorrect email', () => {
    cy.intercept('POST', 'http://localhost:5000/login').as('loginRequest')
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('not@mail.com')
    cy.get('input[name="password"]').type('notpassword')
    cy.get('button').click()
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 404)
  });
  it('should fail - empty form', () => {
    cy.intercept('POST', 'http://localhost:5000/login').as('loginRequest')
    cy.visit('http://localhost:3000/login')
    cy.get('button').click()
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 422)
  });
  it('should access to register', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('a[id="register"').click()
    cy.url().should('include', '/register')
  });
});