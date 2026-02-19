import LoginPage from '../../support/pageObjects/loginPage'
import loginData from '../../fixtures/loginData.json'


describe('Login Feature OrangeHM (POM)', () => {

  beforeEach(() => {
    LoginPage.visit()
  })

  it('TC-01: Login berhasil dengan credential valid', () => {
    LoginPage.inputUsername(loginData.validUser.username)
    LoginPage.inputPassword(loginData.validUser.password)
    LoginPage.clickLogin()
    LoginPage.verifyDashboard()
  })

  it('TC-02: Login gagal jika password salah', () => {
    LoginPage.inputUsername(loginData.wrongPassword.username)
    LoginPage.inputPassword(loginData.wrongPassword.password)
    LoginPage.clickLogin()
    LoginPage.verifyErrorMessage('Invalid credentials')
  })

  it('TC-03: Login gagal jika username salah', () => {
    LoginPage.inputUsername(loginData.wrongUsername.username)
    LoginPage.inputPassword(loginData.wrongUsername.password)
    LoginPage.clickLogin()
    LoginPage.verifyErrorMessage('Invalid credentials')
  })

  it('TC-04: Login gagal jika username kosong', () => {
    LoginPage.inputUsername(loginData.emptyUsername.username)
    LoginPage.inputPassword(loginData.emptyUsername.password)
    LoginPage.clickLogin()
    LoginPage.verifyErrorMessage('Required')
  })

  it('TC-05: Login gagal jika password kosong', () => {
    LoginPage.inputUsername(loginData.emptyPassword.username)
    LoginPage.inputPassword(loginData.emptyPassword.password)
    LoginPage.clickLogin()
    LoginPage.verifyErrorMessage('Required')
  })
  
  it('TC-06: Password harus dalam keadaan masked', () => {
    LoginPage.verifyPasswordMasked()

    LoginPage.inputPassword('admin123')

    LoginPage.verifyPasswordMasked()
  })


  it('TC-07: Login menggunakan tombol Enter', () => {
    LoginPage.inputUsername(loginData.validUser.username)
    LoginPage.inputPassword(loginData.validUser.password)

    LoginPage.pressEnterLogin()

    LoginPage.verifyDashboard()
  })

  it('TC-08: Login gagal jika kedua field kosong', () => {
    LoginPage.clickLogin()

    LoginPage.verifyRequiredFields()
    LoginPage.verifyNoInvalidCredentialMessage()
  })



})
