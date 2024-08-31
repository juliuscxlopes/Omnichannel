const { getChannel } = require('../../config/rabbitMQConfig');
const attendantService = require('../../../database/services/tableattendants');

const processDeleteMessage = async (message) => {
    const { email } = JSON.parse(message.content.toString());

    try {
        const result = await attendantService.deleteAttendant(email);
        console.log('Atendente excluído:', result);

        const channel = getChannel();
        channel.ack(message); // Confirma o processamento da mensagem
    } catch (error) {
        console.error('Erro ao processar mensagem de exclusão:', error);
        const channel = getChannel();
        channel.nack(message, false, true); // Reencaminha a mensagem em caso de erro
    }
};

const startDeleteWorker = async () => {
    const channel = getChannel();
    await channel.assertQueue('deleteAttendantQueue', { durable: true });
    console.log('Worker deleteAttendantQueue iniciado. Aguardando mensagens...');

    channel.consume('deleteAttendantQueue', processDeleteMessage, { noAck: false });
};

module.exports = startDeleteWorker;
