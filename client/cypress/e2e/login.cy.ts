describe('login', () => {
  it('should login', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('fubo@gmail.com')
    cy.get('input[name="password"]').type('fubo')
    cy.get('button').click()
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
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('fubo@gmail.com')
    cy.get('input[name="password"]').type('notpassword')
    cy.get('button').click()
    cy.url().should('include', '/login')
  });
  it('should fail - incorrect email', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('not@mail.com')
    cy.get('input[name="password"]').type('notpassword')
    cy.get('button').click()
    cy.url().should('include', '/login')
  });
  it('should fail - empty form', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('button').click()
    cy.url().should('include', '/login')
  });
  it('should access to register', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('a[id="register"').click()
    cy.url().should('include', '/register')
  });
});