const { getChannel } = require('../../config/rabbitMQConfig');
const databaseService = require('../../../database/services/databaseService');

const processDeleteMessage = async (message) => {
    const { cnpj } = JSON.parse(message.content.toString());

    try {
        const result = await databaseService.deleteWhatsAppConversation(cnpj);
        console.log('Conversa deletada:', result);

        const channel = getChannel();
        channel.ack(message);
    } catch (error) {
        console.error('Erro ao processar mensagem de deleção:', error);
        const channel = getChannel();
        channel.nack(message, false, true);
    }
};

const startDeleteWorker = async () => {
    const channel = getChannel();
    await channel.assertQueue('deleteQueue', { durable: true });
    console.log('Worker deleteQueue iniciado. Aguardando mensagens...');

    channel.consume('deleteQueue', processDeleteMessage, { noAck: false });
};

module.exports = startDeleteWorker;
