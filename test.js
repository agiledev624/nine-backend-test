const server = require('./server.js')
const supertest = require('supertest')
const requestWithSupertest = supertest(server)
const sampleRequest = require('./dummydata')

describe('Primary Endpoint', () => {
  it('GET / should show the active state of the server', async () => {
    const res = await requestWithSupertest.get('/')
    expect(res.status).toEqual(200)
  })

  it('send POST request with sample data to /', async () => {
    const res = await requestWithSupertest
      .post('/')
      .send(sampleRequest)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toHaveProperty('response')
      })
  })

  it('400 error check with unexpected data', async () => {
    const request = {
      name: 'abc',
      address: 'data',
    }
    const res = await requestWithSupertest.post('/').send(request).expect(400)
  })
})
