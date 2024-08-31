const amqp = require('amqplib');
const { connectRabbitMQ, getChannel } = require('../config/rabbitMQConfig');
const { v4: uuidv4 } = require('uuid');

let responseQueue;
let responseCallback = {};

// Conecta ao RabbitMQ e prepara a fila de respostas
const init = async () => {
  await connectRabbitMQ();
  const channel = getChannel();
  
  responseQueue = await channel.assertQueue('', { exclusive: true }); // Fila temporária para receber respostas
  console.log('Fila de resposta criada:', responseQueue.queue);

  // Consome mensagens da fila de resposta
  channel.consume(responseQueue.queue, (msg) => {
    if (msg.properties.correlationId && responseCallback[msg.properties.correlationId]) {
      const response = msg.content.toString();
      const callback = responseCallback[msg.properties.correlationId];
      callback(response);
      delete responseCallback[msg.properties.correlationId]; // Limpa callback após uso
    }
  }, { noAck: true });
};

// Envia uma solicitação de login e retorna a resposta
const authenticate = async (email, password) => {
  return new Promise((resolve, reject) => {
    const correlationId = uuidv4();
    responseCallback[correlationId] = resolve;

    const message = { email, password };
    const channel = getChannel();
    
    channel.sendToQueue('loginQueue', Buffer.from(JSON.stringify(message)), {
      replyTo: responseQueue.queue,
      correlationId
    });
  });
};

// Inicia o serviço
init().catch(console.error);

module.exports = {
  authenticate
};
