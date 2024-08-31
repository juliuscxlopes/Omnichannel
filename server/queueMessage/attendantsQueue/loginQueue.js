const startLoginWorker = require('../../../messaging/workers/attendants/loginWorker');

const setupLoginQueue = async () => {
  console.log('Iniciando fila de login...');

  await startLoginWorker(); // Inicia o worker de login

  console.log('Fila de login iniciada.');
};

module.exports = setupLoginQueue;