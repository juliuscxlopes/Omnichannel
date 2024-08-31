const express = require('express');
const dotenv = require('dotenv');
const webhookRoutes = require('./routes/chatbotsRoutes/webhookRoutes');
const dbwhatsappchat = require('./queueMessage/whatsappQueue/dbwhatsappchat');
const { connectRabbitMQ } = require('../messaging/config/rabbitMQConfig');
const { setupAttendantsQueue } = require('./queueMessage/attendantsQueue/attendantsQueue');
const { setupLoginQueue } = require('./queueMessage/attendantsQueue/loginQueue');
// Load environment variables
dotenv.config();

const startServer = async () => {
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.json());

    // Configura as rotas específicas do WhatsApp
    app.use(webhookRoutes);

    try {
        // Conecta ao RabbitMQ antes de iniciar as filas
        await connectRabbitMQ();
        //Inicia o serviço de fila de atendimentos.
        await setupAttendantsQueue();
        await setupLoginQueue();
        // Inicia o serviço de filas dbwhatsappchat.
        dbwhatsappchat();
    } catch (error) {
        console.error('Erro ao iniciar as filas:', error);
        process.exit(1); // Opcional: Saia do processo se as filas não puderem ser iniciadas
    }

    // Inicia o servidor
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

module.exports = startServer;
