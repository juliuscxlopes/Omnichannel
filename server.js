const express = require('express');
const dotenv = require('dotenv');
const webhookRoutes = require('./chatBots/whatsApp/routes/webhookRoutes'); // Atualize para o caminho correto
//const messengerRoutes = require('./chatBots/messenger'); // Atualize para o caminho correto

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para analisar JSON
app.use(express.json());

// Rotas
app.use('/webhook/whatsapp', webhookRoutes); // Rota para o WhatsApp
//app.use('/webhook/messenger', messengerRoutes); // Rota para o Messenger

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
