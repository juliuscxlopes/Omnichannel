// controllers/dataBaseController.js
const dataBaseService = require('../services/databaseService'); // Corrigido para importar corretamente


// Criar uma nova conversa do WhatsApp
const createWhatsAppConversation = async (req, res) => {
  try {
    const data = req.body;
    const result = await dataBaseService.createWhatsAppConversation(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter todas as conversas do WhatsApp
const getWhatsAppConversations = async (req, res) => {
  try {
    const result = await dataBaseService.getWhatsAppConversations();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter uma conversa específica por CNPJ
const getWhatsAppConversationByCNPJ = async (req, res) => {
  try {
    const cnpj = req.params.cnpj;
    const result = await dataBaseService.getWhatsAppConversationByCNPJ(cnpj);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Conversation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar uma conversa específica por CNPJ
const updateWhatsAppConversation = async (req, res) => {
  try {
    const cnpj = req.params.cnpj;
    const data = req.body;
    const result = await dataBaseService.updateWhatsAppConversation(cnpj, data);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Conversation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar uma conversa específica por CNPJ
const deleteWhatsAppConversation = async (req, res) => {
  try {
    const cnpj = req.params.cnpj;
    const result = await dataBaseService.deleteWhatsAppConversation(cnpj);
    if (result) {
      res.status(200).json({ message: 'Conversation deleted successfully' });
    } else {
      res.status(404).json({ message: 'Conversation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createWhatsAppConversation,
  getWhatsAppConversations,
  getWhatsAppConversationByCNPJ,
  updateWhatsAppConversation,
  deleteWhatsAppConversation
};
