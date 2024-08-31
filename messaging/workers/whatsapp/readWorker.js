const { getChannel } = require('../../config/rabbitMQConfig');
const databaseService = require('../../../database/services/databaseService');

// Função que processa as mensagens de leitura
const processReadMessage = async (message) => {
    try {
        const result = await databaseService.getWhatsAppConversations();
        console.log('Conversas lidas:', result);

        const channel = getChannel();
        channel.ack(message); // Confirma o processamento da mensagem
    } catch (error) {
        console.error('Erro ao processar mensagem de leitura:', error);
        const channel = getChannel();
        channel.nack(message, false, true); // Reencaminha a mensagem em caso de erro
    }
};

const startReadWorker = async () => {
    const channel = getChannel();
    await channel.assertQueue('readQueue', { durable: true });
    console.log('Worker readQueue iniciado. Aguardando mensagens...');

    channel.consume('readQueue', processReadMessage, { noAck: false });
};

module.exports = startReadWorker;
