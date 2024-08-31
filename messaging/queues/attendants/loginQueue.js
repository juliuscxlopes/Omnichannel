const { getChannel } = require('../config/rabbitMQConfig');

const setupLoginQueue = async () => {
    const channel = getChannel();
    await channel.assertQueue('loginQueue', {
        durable: true
    });
    console.log('Fila loginQueue configurada.');
};

const sendToLoginQueue = async (data) => {
    const channel = getChannel();
    channel.sendToQueue('loginQueue', Buffer.from(JSON.stringify(data)), {
        persistent: true
    });
    console.log('Mensagem enviada para a fila loginQueue:', data);
};

module.exports = {
    setupLoginQueue,
    sendToLoginQueue
};
