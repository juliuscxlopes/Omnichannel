const amqp = require('amqplib');

let connection, channel;

const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log('Conectado ao RabbitMQ');
    } catch (error) {
        console.error('Erro ao conectar ao RabbitMQ:', error);
    }
};

const getChannel = () => {
    if (!channel) {
        throw new Error('Canal RabbitMQ não inicializado');
    }
    return channel;
};

module.exports = {
    connectRabbitMQ,
    getChannel
};
