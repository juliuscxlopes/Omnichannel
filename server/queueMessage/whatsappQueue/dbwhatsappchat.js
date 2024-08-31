const startCreateWorker = require('../../../messaging/workers/whatsapp/createWorker');
const startReadWorker = require('../../../messaging/workers/whatsapp/readWorker');
const startUpdateWorker = require('../../../messaging/workers/whatsapp/updateWorker');
const startDeleteWorker = require('../../../messaging/workers/whatsapp/deleteWorker');

const dbwhatsappchat = () => {
    console.log('Iniciando filas de mensagens...');

    startCreateWorker();
    startReadWorker();
    startUpdateWorker();
    startDeleteWorker();

    console.log('Filas de mensagens iniciadas.');
};

module.exports = dbwhatsappchat;
