describe('home', () => {
  it('should display home page', () => {
    cy.visit('http://localhost:3000/home')
    cy.get('h1').should('contain', 'Wildle')
  });
  it('shoul access to login page', () => {
    cy.visit('http://localhost:3000/home')
    cy.get('a[id="login"]').click()
    cy.url().should('include', '/login')
  });
  it('should access to ranking page', () => {
    cy.visit('http://localhost:3000/home')
    cy.get('a[id="ranking"]').click()
    cy.url().should('include', '/ranking')
  });
  it('should access to user page', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('fubo@gmail.com')
    cy.get('input[name="password"]').type('fubo')
    cy.get('button').click()
    cy.get('a[id="user"]').click()
    cy.url().should('include', '/user')
  });
  it('should access to logout', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('fubo@gmail.com')
    cy.get('input[name="password"]').type('fubo')
    cy.get('button').click()
    cy.get('img[id="logout"]').click()
    cy.get('a[id="login"]').click()
    cy.url().should('include', '/login')
  });
  it('should enter a new animal', () => {
    cy.visit('http://localhost:3000/home')
    cy.get('input[id="guess"]').type('Elefante')
    cy.get('button').click()
    cy.get('div[id="Elefante"]').should('exist');
  });
});