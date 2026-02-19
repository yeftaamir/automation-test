class LoginPage {

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
  }

  usernameField() {
    return cy.get('input[name="username"]')
  }

  passwordField() {
    return cy.get('input[name="password"]')
  }

  loginButton() {
    return cy.get('button[type="submit"]')
  }

  inputUsername(username) {
    this.usernameField().clear()
    if (username) this.usernameField().type(username)
  }

  inputPassword(password) {
    this.passwordField().clear()
    if (password) this.passwordField().type(password)
  }

  clickLogin() {
    this.loginButton().click()
  }

  pressEnterLogin() {
    this.passwordField().type('{enter}')
  }

  verifyDashboard() {
    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
  }

  verifyErrorMessage(message) {
    cy.contains(message).should('be.visible')
  }

  verifyPasswordMasked() {
    this.passwordField().should('have.attr', 'type', 'password')
  }

  verifyRequiredFields() {
    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2)
      .and('contain', 'Required')
  }

  verifyNoInvalidCredentialMessage() {
    cy.contains('Invalid credentials').should('not.exist')
  }

}

export default new LoginPage()