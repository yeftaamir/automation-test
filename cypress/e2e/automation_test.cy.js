describe('Feature Login OrangeHM', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
  
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('TC-001: Verifikasi Halaman Login', () => {
    cy.url().should('include', '/auth/login');
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  })

  it('TC-002: Login dengan username & password valid harus berhasil', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.url().should('not.include', '/auth/login'); 
    cy.contains('Dashboard').should('be.visible');
  });

  it('TC-003: Login gagal jika password salah', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('wrong123');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC-004: Login gagal jika username salah', () => {
    cy.get('input[name="username"]').type('WrongUser');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC-005: Validasi error jika username kosong', () => {
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  it('TC-006: Validasi error jika password kosong', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  it('TC-007: Validasi error saat kedua kolom kosong', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2)
  })

  it('TC-008: Password harus dalam keadaan masked', () => {
    cy.get('input[name="password"]')
      .should('have.attr', 'type', 'password')

    cy.get('input[name="password"]').type('admin123')

    cy.get('input[name="password"]')
      .should('have.attr', 'type', 'password')
  })

  it('TC-009: Login menggunakan tombol Enter', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')

    cy.get('input[name="password"]').type('{enter}')

    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
  })
})