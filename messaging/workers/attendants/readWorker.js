const { getChannel } = require('../../config/rabbitMQConfig');
const attendantService = require('../../../database/services/tableattendants');

const processReadMessage = async (message) => {
    const { email } = JSON.parse(message.content.toString());

    try {
        const result = await attendantService.getAttendant(email);
        console.log('Atendente lido:', result);

        const channel = getChannel();
        channel.sendToQueue(
            message.properties.replyTo,
            Buffer.from(JSON.stringify(result)),
            { correlationId: message.properties.correlationId }
        );
        channel.ack(message); // Confirma o processamento da mensagem
    } catch (error) {
        console.error('Erro ao processar mensagem de leitura:', error);
        const channel = getChannel();
        channel.nack(message, false, true); // Reencaminha a mensagem em caso de erro
    }
};

const startReadWorker = async () => {
    const channel = getChannel();
    await channel.assertQueue('readAttendantQueue', { durable: true });
    console.log('Worker readAttendantQueue iniciado. Aguardando mensagens...');

    channel.consume('readAttendantQueue', processReadMessage, { noAck: false });
};

module.exports = startReadWorker;
