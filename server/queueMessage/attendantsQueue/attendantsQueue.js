const startCreateWorker = require('../../../messaging/workers/attendants/createWorker');
const startReadWorker = require('../../../messaging/workers/attendants/readWorker');
const startUpdateWorker = require('../../../messaging/workers/attendants/updateWorker');
const startDeleteWorker = require('../../../messaging/workers/attendants/deleteWorker');

const setupAttendantsQueue = async () => {
  console.log('Iniciando filas de atendentes...');

  await startCreateWorker();
  await startReadWorker();
  await startUpdateWorker();
  await startDeleteWorker();

  console.log('Filas de atendentes iniciadas.');
};

module.exports = setupAttendantsQueue;
