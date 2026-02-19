describe('Login OrangeHRM with Intercept', () => {

  const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

  beforeEach(() => {
    cy.visit(url)
  })

  it('TC-001: Login berhasil (Intercept POST login)', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302)
    cy.url().should('include', '/dashboard')
  })

  it('TC-002: Login gagal password salah (Intercept validate)', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('wrong123')
    cy.intercept('POST', '**/auth/validate').as('invalidLogin')

    cy.get('button[type="submit"]').click()

    cy.wait('@invalidLogin')
    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-003: Username kosong (Intercept i18n messages)', () => {

    cy.intercept('GET', '**/core/i18n/messages').as('i18n')

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.wait('@i18n')

    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  it('TC-004: Password kosong (Intercept GET login)', () => {

    cy.intercept('GET', '**/auth/login').as('loginPage')

    cy.reload()
    cy.wait('@loginPage')

    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })


  it('TC-005: Login menggunakan Enter (Intercept dashboard)', () => {

    cy.intercept('GET', '**/dashboard/**').as('dashboardLoad')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123{enter}')

    cy.wait('@dashboardLoad')
    cy.url().should('include', '/dashboard')
  })

  it('TC-006: Login gagal jika password salah', () => {
    cy.intercept('POST', '**/auth/validate').as('loginFail')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('wrong123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginFail')
        .its('response.statusCode')
        .should('eq', 302)

    cy.contains('Invalid credentials').should('be.visible')
  })


  it('TC-007: Login gagal jika username salah (Stubbed)', () => {
    cy.intercept('POST', '**/auth/validate', (req) => {
        req.reply({
        statusCode: 401,
        body: {
            message: 'Invalid credentials'
        }
        })
    }).as('stubLogin')

    cy.get('input[name="username"]').type('WrongUser');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@stubLogin')

    cy.contains('Invalid credentials').should('be.visible');
  });
})