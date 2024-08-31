const { getChannel } = require('../../config/rabbitMQConfig');
const databaseService = require('../../../database/services/databaseService');

const processUpdateMessage = async (message) => {
    const { cnpj, data } = JSON.parse(message.content.toString());

    try {
        const result = await databaseService.updateWhatsAppConversation(cnpj, data);
        console.log('Conversa atualizada:', result);

        const channel = getChannel();
        channel.ack(message);
    } catch (error) {
        console.error('Erro ao processar mensagem de atualização:', error);
        const channel = getChannel();
        channel.nack(message, false, true);
    }
};

const startUpdateWorker = async () => {
    const channel = getChannel();
    await channel.assertQueue('updateQueue', { durable: true });
    console.log('Worker updateQueue iniciado. Aguardando mensagens...');

    channel.consume('updateQueue', processUpdateMessage, { noAck: false });
};

module.exports = startUpdateWorker;
