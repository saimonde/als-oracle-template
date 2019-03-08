'use strict';
require('dotenv').config();
const Boom = require('boom');
// const env = require('../../../../config/knexfile');
// const db = require('knex')(env.development);
const participant = require('../../../../src/models/participants');
const Joi=require('joi');

/**
 * Operations on /participants/{Type}/{ID}
 */
module.exports = {
    /**
     * summary: Look up participant information
     * description: The HTTP request GET /participants/{Type}/{ID} is used to find out in which FSP the requested Party, defined by {Type} and {ID} is located (for example, GET /participants/MSISDN/123456789). This HTTP request should support a query string to filter FSP information regarding a specific currency only (This similarly applies to the SubId). To query a specific currency only, the HTTP request GET /participants/{Type}/{ID}?currency=XYZ should be used, where XYZ is the requested currency. Note - Both the currency and the SubId can be used mutually inclusive or exclusive
     * parameters: accept, Type, ID, Currency, SubId, content-type, date, fspiop-source, x-forwarded-for, fspiop-destination, fspiop-encryption, fspiop-signature, fspiop-uri, fspiop-http-method
     * produces: application/json
     * responses: 200, 400, 401, 403, 404, 405, 406, 501, 503
     */
    get:  function ParticipantsByTypeAndIDGet(request, h) {
        const TYPE_REGEX = new RegExp(process.env.TYPE_REGEX,"i");
        const IDENTIFIER_REGEX = new RegExp(process.env.IDENTIFIER_REGEX,"i");
       
        const identifierSchema=Joi.object().keys({
            Type:Joi.string().regex(TYPE_REGEX).required(),
            ID:Joi.string().regex(IDENTIFIER_REGEX).length(14).required()
        });

        const type = request.params.Type;
        const identifier = request.params.ID;
        var response=null;

        Joi.validate(
            {
                Type:type,ID:identifier
            },identifierSchema, (err,value)=>{
                if(err){
                    //console.log(err);
                    response= err.message;
                }else{
                    var accountNumber=value.ID;
                    var bankCode=accountNumber.substring(0,3);
                    response=   participant.getParticipant(bankCode);
                        
                }
            }
        );

         return  response;
    },
    /**
     * summary: Return participant information
     * description: The PUT /participants/{Type}/{ID} is used to update information in the server regarding the provided identity, defined by {Type} and {ID} (for example, PUT /participants/MSISDN/123456789).
     * parameters: Type, ID, content-type, date, fspiop-source, body, accept, x-forwarded-for, fspiop-destination, fspiop-encryption, fspiop-signature, fspiop-uri, fspiop-http-method, content-length
     * produces: application/json
     * responses: 200, 400, 401, 403, 404, 405, 406, 501, 503
     */
    put: function ParticipantsByTypeAndIDPut(request, h) {
        return Boom.notImplemented();
    },
    /**
     * summary: Create participant information
     * description: The HTTP request POST /participants/{Type}/{ID} is used to create information in the server regarding the provided identity, defined by {Type} and {ID} (for example, POST /participants/MSISDN/123456789).
     * parameters: accept, Type, ID, content-type, date, fspiop-source, body, x-forwarded-for, fspiop-destination, fspiop-encryption, fspiop-signature, fspiop-uri, fspiop-http-method, content-length
     * produces: application/json
     * responses: 201, 400, 401, 403, 404, 405, 406, 501, 503
     */
    post: function ParticipantsByTypeAndIDPost(request, h) {
        return Boom.notImplemented();
    },
    /**
     * summary: Delete participant information
     * description: The HTTP request DELETE /participants/{Type}/{ID} is used to delete information in the server regarding the provided identity, defined by {Type} and {ID}) (for example, DELETE /participants/MSISDN/123456789). This HTTP request should support a query string to delete FSP information regarding a specific currency only (This similarly applies to the SubId). To delete a specific currency only, the HTTP request DELETE /participants/{Type}/{ID}?currency=XYZ should be used, where XYZ is the requested currency. Note - Both the currency and the SubId can be used mutually inclusive or exclusive
     * parameters: accept, Type, ID, Currency, SubId, content-type, date, fspiop-source, x-forwarded-for, fspiop-destination, fspiop-encryption, fspiop-signature, fspiop-uri, fspiop-http-method
     * produces: application/json
     * responses: 204, 400, 401, 403, 404, 405, 406, 501, 503
     */
    delete: function ParticipantsByTypeAndIDDelete(request, h) {
        return Boom.notImplemented();
    }
};
