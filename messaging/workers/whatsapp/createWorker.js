const { getChannel } = require('../../config/rabbitMQConfig');
const databaseService = require('../../../database/services/databaseService');

// Função que processa as mensagens de criação
const processCreateMessage = async (message) => {
    const data = JSON.parse(message.content.toString());

    try {
        const result = await databaseService.createWhatsAppConversation(data);
        console.log('Conversa criada:', result);

        const channel = getChannel();
        channel.ack(message); // Confirma o processamento da mensagem
    } catch (error) {
        console.error('Erro ao processar mensagem de criação:', error);
        const channel = getChannel();
        channel.nack(message, false, true); // Reencaminha a mensagem em caso de erro
    }
};

const startCreateWorker = async () => {
    const channel = getChannel();
    await channel.assertQueue('createQueue', { durable: true });
    console.log('Worker createQueue iniciado. Aguardando mensagens...');

    channel.consume('createQueue', processCreateMessage, { noAck: false });
};

module.exports = startCreateWorker;
