'use strict'

const Test = require('tape')
const Hapi = require('hapi')
const HapiOpenAPI = require('hapi-openapi')
const Path = require('path')
const Mockgen = require('../src/models/mockgen.js')
const responseCodes = [201, 400, 401, 403, 404, 405, 406, 501, 503]

/**
 * Test for /participants 
 */
Test('/participants', function (t) {

  /**
   * summary: Batch create participant information
   * description: The HTTP request POST /participants is used to create information in the server regarding the provided list of identities. This request should be used for bulk creation of FSP information for more than one Party. The optional currency parameter should indicate that each provided Party supports the currency
   * parameters: accept, content-type, date, fspiop-source, body, content-length, x-forwarded-for, fspiop-destination, fspiop-encryption, fspiop-signature, fspiop-uri, fspiop-http-method
   * produces: application/json
   * responses: 201, 400, 401, 403, 404, 405, 406, 501, 503
   */
  t.test('test ParticipantsPost post operation', async function (t) {
    try {
      const server = new Hapi.Server()

      await server.register({
        plugin: HapiOpenAPI,
        options: {
          api: Path.resolve(__dirname, '../src/interface/swagger.json'),
          handlers: Path.join(__dirname, '../src/handlers'),
          outputvalidation: true
        }
      })

      const requests = new Promise((resolve, reject) => {
        Mockgen().requests({
          path: '/participants',
          operation: 'post'
        }, function (error, mock) {
          let newRequest = Object.assign({}, mock.request, { headers: { 'fspiop-source': 'source', 'date': 'date', 'Content-Type': 'application/json', 'accept': 'application/json' } })
          newRequest.body.partyList = [newRequest.body.partyList[0]]
          mock.request = newRequest

          return error ? reject(error) : resolve(mock)
        })
      })

      const mock = await requests

      t.ok(mock)
      t.ok(mock.request)
      // Get the resolved path from mock request
      // Mock request Path templates({}) are resolved using path parameters
      const options = {
        method: 'post',
        url: '' + mock.request.path
      }
      if (mock.request.body) {
        // Send the request body
        options.payload = mock.request.body
      } else if (mock.request.formData) {
        // Send the request form data
        options.payload = mock.request.formData
        // Set the Content-Type as application/x-www-form-urlencoded
        options.headers = options.headers || {}
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded'

        // options.headers['Accept: application/json' \
        // options.headers['Cache-Control: no-cache' \
        // options.headers['Content-Type: application/json' \
        // options.headers['Postman-Token: fa454a97-3f68-4310-9961-4f66f6ac4809' \
        // options.headers['accept: {{accept}}' \
        // options.headers['content-type: {{content-type}}' \
        // options.headers['date: {{date}}' \
        // options.headers['fspiop-destination']
        // options.headers['fspiop-encryption']
        // options.headers['fspiop-http-method']
        // options.headers['fspiop-signature']
        options.headers['fspiop-source'] = 'source'
        // options.headers['fspiop-uri']
        // options.headers['x-forwarded-for']
      }
      // If headers are present, set the headers.
      if (mock.request.headers) {
        options.headers = mock.request.headers
      }

      // const response = await server.inject(options)

      // t.equal(response.statusCode, 201, 'Ok response status')
      // t.end()

      for (let responseCode of responseCodes) {
        // options.responseCode = responseCode
        server.app.responseCode = responseCode
        const response = await server.inject(options)
        console.log(options)
        t.equal(response.statusCode, responseCode, 'Ok response status')
      }
      t.end()
    } catch (e) {
      console.log(e)
      t.end()
    }
  })
})
