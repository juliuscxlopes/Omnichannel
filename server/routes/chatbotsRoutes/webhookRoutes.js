// chatBots/whatsApp/routes/webhookRoutes.js
const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../../../chatBots/whatsApp/controllers/webhookController');
const verificationController = require('../../../chatBots/common/controllers/verificationController');
const messageProcessor = require('../../../chatBots/common/middleware/messageProcessor');
const statusProcessor = require('../../../chatBots/common/middleware/statusProcessor');


// Middleware de processamento básico
router.post('/webhook/whatsapp', messageProcessor, statusProcessor, handleWebhook);

// Rota para verificação do webhook
router.get('/webhook/whatsapp', verificationController.verifyWebhook);


// Middleware de processamento básico
router.post('/webhook/messenger', messageProcessor, statusProcessor, handleWebhook);

// Rota para verificação do webhook
router.get('/webhook/messenger', verificationController.verifyWebhook);


module.exports = router;

