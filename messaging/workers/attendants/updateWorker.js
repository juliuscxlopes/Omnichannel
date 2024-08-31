const { getChannel } = require('../../config/rabbitMQConfig');
const attendantService = require('../../../database/services/tableattendants');

const processUpdateMessage = async (message) => {
    const { email, updateData } = JSON.parse(message.content.toString());

    try {
        const result = await attendantService.updateAttendant(email, updateData);
        console.log('Atendente atualizado:', result);

        const channel = getChannel();
        channel.ack(message); // Confirma o processamento da mensagem
    } catch (error) {
        console.error('Erro ao processar mensagem de atualização:', error);
        const channel = getChannel();
        channel.nack(message, false, true); // Reencaminha a mensagem em caso de erro
    }
};

const startUpdateWorker = async () => {
    const channel = getChannel();
    await channel.assertQueue('updateAttendantQueue', { durable: true });
    console.log('Worker updateAttendantQueue iniciado. Aguardando mensagens...');

    channel.consume('updateAttendantQueue', processUpdateMessage, { noAck: false });
};

module.exports = startUpdateWorker;
