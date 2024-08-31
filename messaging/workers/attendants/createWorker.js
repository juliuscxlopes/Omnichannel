const { getChannel } = require('../../config/rabbitMQConfig');
const attendantService = require('../../../database/services/tableattendants');

const processCreateMessage = async (message) => {
    const data = JSON.parse(message.content.toString());

    try {
        const result = await attendantService.createAttendant(data);
        console.log('Atendente criado:', result);

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
    await channel.assertQueue('createAttendantQueue', { durable: true });
    console.log('Worker createAttendantQueue iniciado. Aguardando mensagens...');

    channel.consume('createAttendantQueue', processCreateMessage, { noAck: false });
};

module.exports = startCreateWorker;
