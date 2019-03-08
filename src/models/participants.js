const env = require('../../config/knexfile');
const db = require('knex')(env.development);
const Boom = require('boom');

exports.getParticipant = async (participantId) => {
     let partyList = await db.from('participant')
             .join('currencyParticipant','participant.participantId','currencyParticipant.participantId')
             .join('currency','currency.currencyId','currencyParticipant.currencyId')
             .select('participant.participantName AS fspId','currency.name AS currency', db.raw('? as ??', ['null', 'partySubIdOrType']))
             .where('participant.participantName',participantId)
             .catch((err) => {
                console.log(err);
                throw Boom(err);
            });

        partyList = (partyList.length==0)? 'Participant not found': partyList;
        
        return {partyList};
}