'use strict';

const Test = require('tape');
const Hapi = require('hapi');
const HapiOpenAPI = require('hapi-openapi');
const Path = require('path');
const Mockgen = require('../../../data/mockgen.js');

/**
 * Test for /participants/{Type}/{ID}
 */
Test('/participants/{Type}/{ID}', function (t) {

    /**
     * summary: Look up participant information
     * description: The HTTP request GET /participants/{Type}/{ID} is used to find out in which FSP the requested Party, defined by {Type} and {ID} is located (for example, GET /participants/MSISDN/123456789). This HTTP request should support a query string to filter FSP information regarding a specific currency only (This similarly applies to the SubId). To query a specific currency only, the HTTP request GET /participants/{Type}/{ID}?currency=XYZ should be used, where XYZ is the requested currency. Note - Both the currency and the SubId can be used mutually inclusive or exclusive
     * parameters: accept, Type, ID, Currency, SubId, content-type, date, fspiop-source, x-forwarded-for, fspiop-destination, fspiop-encryption, fspiop-signature, fspiop-uri, fspiop-http-method
     * produces: application/json
     * responses: 200, 400, 401, 403, 404, 405, 406, 501, 503
     */
    t.test('test ParticipantsByTypeAndIDGet get operation', async function (t) {

        const server = new Hapi.Server();

        await server.register({
            plugin: HapiOpenAPI,
            options: {
                api: Path.resolve(__dirname, '../../../config/swagger.json'),
                handlers: Path.join(__dirname, '../../../handlers'),
                outputvalidation: true
            }
        });

        const requests = new Promise((resolve, reject) => {
            Mockgen().requests({
                path: '/participants/{Type}/{ID}',
                operation: 'get'
            }, function (error, mock) {
                return error ? reject(error) : resolve(mock);
            });
        });

        const mock = await requests;

        t.ok(mock);
        t.ok(mock.request);
        //Get the resolved path from mock request
        //Mock request Path templates({}) are resolved using path parameters
        const options = {
            method: 'get',
            url: '' + mock.request.path
        };
        if (mock.request.body) {
            //Send the request body
            options.payload = mock.request.body;
        } else if (mock.request.formData) {
            //Send the request form data
            options.payload = mock.request.formData;
            //Set the Content-Type as application/x-www-form-urlencoded
            options.headers = options.headers || {};
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        // If headers are present, set the headers.
        if (mock.request.headers && mock.request.headers.length > 0) {
            options.headers = mock.request.headers;
        }

        const response = await server.inject(options);

        t.equal(response.statusCode, 200, 'Ok response status');
        t.end();

    });
    /**
     * summary: Return participant information
     * description: The PUT /participants/{Type}/{ID} is used to update information in the server regarding the provided identity, defined by {Type} and {ID} (for example, PUT /participants/MSISDN/123456789).
     * parameters: Type, ID, content-type, date, fspiop-source, body, accept, x-forwarded-for, fspiop-destination, fspiop-encryption, fspiop-signature, fspiop-uri, fspiop-http-method, content-length
     * produces: application/json
     * responses: 200, 400, 401, 403, 404, 405, 406, 501, 503
     */
    t.test('test ParticipantsByTypeAndIDPut put operation', async function (t) {

        const server = new Hapi.Server();

        await server.register({
            plugin: HapiOpenAPI,
            options: {
                api: Path.resolve(__dirname, '../../../config/swagger.json'),
                handlers: Path.join(__dirname, '../../../handlers'),
                outputvalidation: true
            }
        });

        const requests = new Promise((resolve, reject) => {
            Mockgen().requests({
                path: '/participants/{Type}/{ID}',
                operation: 'put'
            }, function (error, mock) {
                return error ? reject(error) : resolve(mock);
            });
        });

        const mock = await requests;

        t.ok(mock);
        t.ok(mock.request);
        //Get the resolved path from mock request
        //Mock request Path templates({}) are resolved using path parameters
        const options = {
            method: 'put',
            url: '' + mock.request.path
        };
        if (mock.request.body) {
            //Send the request body
            options.payload = mock.request.body;
        } else if (mock.request.formData) {
            //Send the request form data
            options.payload = mock.request.formData;
            //Set the Content-Type as application/x-www-form-urlencoded
            options.headers = options.headers || {};
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        // If headers are present, set the headers.
        if (mock.request.headers && mock.request.headers.length > 0) {
            options.headers = mock.request.headers;
        }

        const response = await server.inject(options);

        t.equal(response.statusCode, 200, 'Ok response status');
        t.end();

    });
    /**
     * summary: Create participant information
     * description: The HTTP request POST /participants/{Type}/{ID} is used to create information in the server regarding the provided identity, defined by {Type} and {ID} (for example, POST /participants/MSISDN/123456789).
     * parameters: accept, Type, ID, content-type, date, fspiop-source, body, x-forwarded-for, fspiop-destination, fspiop-encryption, fspiop-signature, fspiop-uri, fspiop-http-method, content-length
     * produces: application/json
     * responses: 201, 400, 401, 403, 404, 405, 406, 501, 503
     */
    t.test('test ParticipantsByTypeAndIDPost post operation', async function (t) {

        const server = new Hapi.Server();

        await server.register({
            plugin: HapiOpenAPI,
            options: {
                api: Path.resolve(__dirname, '../../../config/swagger.json'),
                handlers: Path.join(__dirname, '../../../handlers'),
                outputvalidation: true
            }
        });

        const requests = new Promise((resolve, reject) => {
            Mockgen().requests({
                path: '/participants/{Type}/{ID}',
                operation: 'post'
            }, function (error, mock) {
                return error ? reject(error) : resolve(mock);
            });
        });

        const mock = await requests;

        t.ok(mock);
        t.ok(mock.request);
        //Get the resolved path from mock request
        //Mock request Path templates({}) are resolved using path parameters
        const options = {
            method: 'post',
            url: '' + mock.request.path
        };
        if (mock.request.body) {
            //Send the request body
            options.payload = mock.request.body;
        } else if (mock.request.formData) {
            //Send the request form data
            options.payload = mock.request.formData;
            //Set the Content-Type as application/x-www-form-urlencoded
            options.headers = options.headers || {};
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        // If headers are present, set the headers.
        if (mock.request.headers && mock.request.headers.length > 0) {
            options.headers = mock.request.headers;
        }

        const response = await server.inject(options);

        t.equal(response.statusCode, 201, 'Ok response status');
        t.end();

    });
    /**
     * summary: Delete participant information
     * description: The HTTP request DELETE /participants/{Type}/{ID} is used to delete information in the server regarding the provided identity, defined by {Type} and {ID}) (for example, DELETE /participants/MSISDN/123456789). This HTTP request should support a query string to delete FSP information regarding a specific currency only (This similarly applies to the SubId). To delete a specific currency only, the HTTP request DELETE /participants/{Type}/{ID}?currency=XYZ should be used, where XYZ is the requested currency. Note - Both the currency and the SubId can be used mutually inclusive or exclusive
     * parameters: accept, Type, ID, Currency, SubId, content-type, date, fspiop-source, x-forwarded-for, fspiop-destination, fspiop-encryption, fspiop-signature, fspiop-uri, fspiop-http-method
     * produces: application/json
     * responses: 204, 400, 401, 403, 404, 405, 406, 501, 503
     */
    t.test('test ParticipantsByTypeAndIDDelete delete operation', async function (t) {

        const server = new Hapi.Server();

        await server.register({
            plugin: HapiOpenAPI,
            options: {
                api: Path.resolve(__dirname, '../../../config/swagger.json'),
                handlers: Path.join(__dirname, '../../../handlers'),
                outputvalidation: true
            }
        });

        const requests = new Promise((resolve, reject) => {
            Mockgen().requests({
                path: '/participants/{Type}/{ID}',
                operation: 'delete'
            }, function (error, mock) {
                return error ? reject(error) : resolve(mock);
            });
        });

        const mock = await requests;

        t.ok(mock);
        t.ok(mock.request);
        //Get the resolved path from mock request
        //Mock request Path templates({}) are resolved using path parameters
        const options = {
            method: 'delete',
            url: '' + mock.request.path
        };
        if (mock.request.body) {
            //Send the request body
            options.payload = mock.request.body;
        } else if (mock.request.formData) {
            //Send the request form data
            options.payload = mock.request.formData;
            //Set the Content-Type as application/x-www-form-urlencoded
            options.headers = options.headers || {};
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        // If headers are present, set the headers.
        if (mock.request.headers && mock.request.headers.length > 0) {
            options.headers = mock.request.headers;
        }

        const response = await server.inject(options);

        t.equal(response.statusCode, 204, 'Ok response status');
        t.end();

    });
    
});
