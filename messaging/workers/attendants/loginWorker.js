const { getChannel, connectRabbitMQ } = require('../../config/rabbitMQConfig');  // Importa também a função connectRabbitMQ
const attendantService = require('../../../database/services/tableattendants');

const processLoginMessage = async (message) => {
  const { email, password } = JSON.parse(message.content.toString());

  try {
    const attendant = await attendantService.getAttendant(email);
    if (attendant && attendant.password === password) {
      getChannel().sendToQueue(
        message.properties.replyTo,
        Buffer.from('Login successful'),
        { correlationId: message.properties.correlationId }
      );
    } else {
      getChannel().sendToQueue(
        message.properties.replyTo,
        Buffer.from('Login failed'),
        { correlationId: message.properties.correlationId }
      );
    }

    getChannel().ack(message);
  } catch (error) {
    console.error('Erro ao processar mensagem de login:', error);
    getChannel().nack(message, false, true);
  }
};

const startLoginWorker = async () => {
  try {
    await connectRabbitMQ();  // Certifica-se de que a conexão com RabbitMQ está estabelecida
    const channel = getChannel();
    await channel.assertQueue('loginQueue', { durable: true });
    console.log('Worker loginQueue iniciado. Aguardando mensagens...');

    channel.consume('loginQueue', processLoginMessage, { noAck: false });
  } catch (error) {
    console.error('Erro ao iniciar o worker de login:', error);
  }
};

module.exports = startLoginWorker;
