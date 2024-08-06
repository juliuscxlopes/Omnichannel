<<<<<<< HEAD
=======
//server.js
>>>>>>> 3f6ee19 (Commit do seculo)
const express = require('express');
const dotenv = require('dotenv');
const webhookRoutes = require('./chatBots/whatsApp/routes/webhookRoutes'); // Atualize para o caminho correto
//const messengerRoutes = require('./chatBots/messenger'); // Atualize para o caminho correto
<<<<<<< HEAD
=======
const databaseRoutes = require('./database/routes/databaseRoutes')
>>>>>>> 3f6ee19 (Commit do seculo)

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para analisar JSON
app.use(express.json());

<<<<<<< HEAD
// Rotas
app.use('/webhook/whatsapp', webhookRoutes); // Rota para o WhatsApp
//app.use('/webhook/messenger', messengerRoutes); // Rota para o Messenger

=======
// Rotas Chatbot
app.use('/webhook/whatsapp', webhookRoutes); // Rota para o WhatsApp
//app.use('/webhook/messenger', messengerRoutes); // Rota para o Messenger

//Base de dados
app.use('webhook/whatsapp/database', databaseRoutes);


>>>>>>> 3f6ee19 (Commit do seculo)
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
