describe('API Automation - Platzi Categories', () => {

  const baseUrl = 'https://api.escuelajs.co/api/v1/categories'
  let categoryId
  let uniqueName = `QA Category ${Date.now()}`

  it('TC-API-01: Get All Categories', () => {
    cy.request('GET', baseUrl).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
      expect(response.body.length).to.be.greaterThan(0)
    })
  })

  it('TC-API-02: Create New Category', () => {
    cy.request('POST', baseUrl, {
      name: uniqueName,
      image: "https://placeimg.com/640/480/any"
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('id')
      expect(response.body.name).to.eq(uniqueName)

      categoryId = response.body.id
    })
  })


  it('TC-API-03: Get Single Category by ID', () => {
    cy.request('GET', `${baseUrl}/${categoryId}`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(categoryId)
      expect(response.body).to.have.property('name')
      expect(response.body).to.have.property('image')
    })
  })


  it('TC-API-04: Update Category', () => {
    const updatedName = `Updated QA Category ${Date.now()}`

    cy.request('PUT', `${baseUrl}/${categoryId}`, {
      name: updatedName,
      image: "https://placeimg.com/640/480/tech"
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.name).to.eq(updatedName)
    })
  })


  it('TC-API-05: Delete Category', () => {
    cy.request('DELETE', `${baseUrl}/${categoryId}`).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  //  NEGATIVE - Verify Deleted Category Not Accessible
  it('TC-API-06: Verify Deleted Category Should Return Error', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/${categoryId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 404])
      expect(response.body).to.have.property('message')
    })
  })

  // NEGATIVE - Create Category Without Name
  it('TC-API-07: Create Category Without Name Should Fail', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      failOnStatusCode: false,
      body: {
        image: "https://placeimg.com/640/480/any"
      }
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 422, 500])
      expect(response.body).to.have.property('message')
    })
  })

  // NEGATIVE - Get Category with Invalid ID
  it('TC-API-08: Get Category with Invalid ID', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/99999999`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 404])
    })
  })

  it('TC-API-09: Validate Category Response Structure', () => {
    cy.request('GET', baseUrl).then((response) => {
      expect(response.status).to.eq(200)

      const category = response.body[0]
      expect(category).to.have.property('id')
      expect(category).to.have.property('name')
      expect(category).to.have.property('image')

      expect(category).to.be.an('object')
    })
  })

  // NEGATIVE
  it('TC-API-10: Create Category with Invalid Image URL', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      failOnStatusCode: false,
      body: {
        name: `Invalid Image ${Date.now()}`,
        image: "invalid-url"
      }
    }).then((response) => {
      expect(response.status).to.not.be.within(200, 299)
    })
  })

  // NEGATIVE
  it('TC-API-11: Update Category with Empty Name Should Fail', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/${categoryId}`,
      failOnStatusCode: false,
      body: {
        name: "",
        image: "https://placeimg.com/640/480/tech"
      }
    }).then((response) => {
      expect(response.status).to.not.be.within(200, 299)
    })
  })

})