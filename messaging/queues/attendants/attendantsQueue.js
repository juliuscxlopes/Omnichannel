const { getChannel } = require('../config/rabbitMQConfig');

const setupAttendantsQueue = async () => {
    const channel = getChannel();
    await channel.assertQueue('attendantsQueue', {
        durable: true
    });
    console.log('Fila attendantsQueue configurada.');
};

const sendToAttendantsQueue = async (data) => {
    const channel = getChannel();
    channel.sendToQueue('attendantsQueue', Buffer.from(JSON.stringify(data)), {
        persistent: true
    });
    console.log('Mensagem enviada para a fila attendantsQueue:', data);
};

module.exports = {
    setupAttendantsQueue,
    sendToAttendantsQueue
};
