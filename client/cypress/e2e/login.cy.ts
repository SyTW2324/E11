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
    cy.get('p').should('Formato de correo electrónico inválido')

  });
  it('should fail - incorrect password', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('fubo@gmail.com')
    cy.get('input[name="password"]').type('notpassword')
    cy.get('button').click()
    cy.get('p').should('Contraseña incorrecta')
  });
  it('should fail - incorrect email', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('not@mail.com')
    cy.get('input[name="password"]').type('notpassword')
    cy.get('button').click()
    cy.get('p').should('Usuario no encontrado')
  });
});