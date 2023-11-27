before(() => {
  cy.request({
    method: 'GET',
    url: 'http://localhost:5000/user/name/usertest',
    failOnStatusCode: false, // This will not fail the test if the status code is 404
  }).then((response) => {
    if (response.status === 200) {
      // The user exists, so delete it
      cy.request('DELETE', `http://localhost:5000/user/${response.body._id}`);
    }
  });
});


describe('register', () => {
  it('should register', () => {
    cy.intercept('POST', 'http://localhost:5000/register').as('registerRequest')
    cy.visit('http://localhost:3000/register')
    cy.get('input[name="username"]').type('usertest')
    cy.get('input[name="email"]').type('test@gmail.com')
    cy.get('input[name="password"]').type('test')
    cy.get('button').click()
    cy.wait('@registerRequest').its('response.statusCode').should('eq', 200)
    cy.url().should('include', '/home')
    cy.request('GET', 'http://localhost:5000/user/name/usertest').then((response) => {
      expect(response.body.username).to.eq('usertest')
      expect(response.body.email).to.eq('test@gmail.com')
      cy.request('DELETE', `http://localhost:5000/user/${response.body._id}`)
    })
  });
  it('should not register - already logged in', () => {
    cy.intercept('POST', 'http://localhost:5000/register').as('registerRequest')
    cy.visit('http://localhost:3000/register')
    cy.get('input[name="username"]').type('fubo')
    cy.get('input[name="email"]').type('fubo@gmail.com')
    cy.get('input[name="password"]').type('fubo')
    cy.get('button').click()
    cy.wait('@registerRequest').its('response.statusCode').should('eq', 409)
  });
  it('should not register - email format', () => {
    cy.visit('http://localhost:3000/register')
    cy.get('input[name="username"]').type('fubo')
    cy.get('input[name="email"]').type('notemail')
    cy.get('input[name="password"]').type('fubo')
    cy.get('button').click()
    cy.url().should('include', '/register')
  });
  it('should not register - empty form', () => {
    cy.intercept('POST', 'http://localhost:5000/register').as('registerRequest')
    cy.visit('http://localhost:3000/register')
    cy.get('button').click()
    cy.url().should('include', '/register')
    cy.wait('@registerRequest').its('response.statusCode').should('eq', 422)
  });
});