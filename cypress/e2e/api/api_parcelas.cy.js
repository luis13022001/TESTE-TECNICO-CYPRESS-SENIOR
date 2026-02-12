describe('API - GET /v1/parcelas?status=VENCIDA', () => {

  it('Deve retornar 200 e listar somente parcelas vencidas', () => {
    cy.request({
      method: 'GET',
      url: '/v1/parcelas?status=VENCIDA',
      headers: {
        Authorization: `Bearer ${Cypress.env('TOKEN')}`
      }
    }).then((resp) => {
      expect(resp.status).to.eq(200)

      expect(resp.body).to.have.property('items')
      expect(resp.body.items).to.be.an('array')
      
      resp.body.items.forEach((parcela) => {
        expect(parcela).to.have.property('id')
        expect(parcela).to.have.property('status')
        expect(parcela).to.have.property('vencimento')
        expect(parcela).to.have.property('valor')

        expect(parcela.status).to.eq('VENCIDA')
      })
    })
  })

})