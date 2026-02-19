describe('API Automation - Platzi Categories', () => {

  const baseUrl = 'https://api.escuelajs.co/api/v1/categories'
  let categoryId

  before(() => {
    cy.request('POST', baseUrl, {
      name: "Test Category Cypress",
      image: "https://placeimg.com/640/480/any"
    }).then((response) => {
      expect(response.status).to.eq(201)
      categoryId = response.body.id
    })
  })

  it('TC-API-01: Get All Categories', () => {
    cy.request('GET', baseUrl).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
    })
  })


  it('TC-API-02: Get Single Category by ID', () => {
    cy.request('GET', `${baseUrl}/1`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id', 1)
      expect(response.body).to.have.property('name')
    })
  })


  it('TC-API-03: Update Category', () => {
    cy.request('PUT', `${baseUrl}/${categoryId}`, {
      name: "Updated Category Cypress",
      image: "https://placeimg.com/640/480/tech"
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.name).to.eq("Updated Category Cypress")
    })
  })


  it('TC-API-04: Delete Category', () => {
    cy.request('DELETE', `${baseUrl}/${categoryId}`).then((response) => {
      expect(response.status).to.eq(200)
    })
  })


  it('TC-API-05: Verify Deleted Category Should Return 404', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/${categoryId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
  })

})
