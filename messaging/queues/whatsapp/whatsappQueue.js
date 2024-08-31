//Configura a fila database
const { getChannel } = require('../../config/rabbitMQConfig');

const setupDBQueue = async () => {
    const channel = getChannel();
    await channel.assertQueue('Whatsapp', {
        durable: true
    });
    console.log('Fila Whatsapp configurada.');
};

const sendToDBQueue = async (data) => {
    const channel = getChannel();
    channel.sendToQueue('dbQueue', Buffer.from(JSON.stringify(data)), {
        persistent: true
    });
    console.log('Mensagem enviada para a fila Whatsapp:', data);
};

module.exports = {
    setupDBQueue,
    sendToDBQueue
};
