//database/routes/dabatabaseRoutes.js
const express = require('express');
const router = express.Router();
const dataBaseController = require('../controllers/dataBaseController');
const { database } = require('pg/lib/defaults');
const pgClient = require('../postgresql/pgClient');

// Criar uma nova conversa do WhatsApp
router.post('/', dataBaseController.createWhatsAppConversation);

// Obter todas as conversas do WhatsApp
router.get('/', dataBaseController.getWhatsAppConversations);

// Obter uma conversa específica por CNPJ
router.get('/:cnpj', dataBaseController.getWhatsAppConversationByCNPJ);

// Atualizar uma conversa específica por CNPJ
router.put('/:cnpj', dataBaseController.updateWhatsAppConversation);

// Deletar uma conversa específica por CNPJ
router.delete('/:cnpj', dataBaseController.deleteWhatsAppConversation);

module.exports = router;