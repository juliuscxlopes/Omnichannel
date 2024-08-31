//databaseService.js
const db = require('../postgresql/pgClient');

// Criar uma nova conversa do WhatsApp
const createWhatsAppConversation = async (data) => {
  const query = `
    INSERT INTO WhatsAppConversations ("Chamado aberto por", "Telefone da Abertura", "Local", "Responsável", "Contato Responsável", "Email", "Titulo", "Descrição")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;
  const values = [data['Chamado aberto por'], data['Telefone da Abertura'], data['Local'], data['Responsável'], data['Contato Responsável'], data['Email'], data['Titulo'], data['Descrição']];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Obter todas as conversas do WhatsApp
const getWhatsAppConversations = async () => {
  const query = 'SELECT * FROM WhatsAppConversations';
  const result = await db.query(query);
  return result.rows;
};

// Obter uma conversa específica por CNPJ
const getWhatsAppConversationByCNPJ = async (cnpj) => {
  const query = 'SELECT * FROM WhatsAppConversations WHERE "CNPJ" = $1';
  const result = await db.query(query, [cnpj]);
  return result.rows[0];
};

// Atualizar uma conversa específica por CNPJ
const updateWhatsAppConversation = async (cnpj, data) => {
  const query = `
    UPDATE WhatsAppConversations
    SET "Chamado aberto por" = $1, "Telefone da Abertura" = $2, "Local" = $3, "Responsável" = $4, "Contato Responsável" = $5, "Email" = $6, "Titulo" = $7, "Descrição" = $8
    WHERE "CNPJ" = $9
    RETURNING *
  `;
  const values = [data['Chamado aberto por'], data['Telefone da Abertura'], data['Local'], data['Responsável'], data['Contato Responsável'], data['Email'], data['Titulo'], data['Descrição'], cnpj];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Deletar uma conversa específica por CNPJ
const deleteWhatsAppConversation = async (cnpj) => {
  const query = 'DELETE FROM WhatsAppConversations WHERE "CNPJ" = $1 RETURNING *';
  const result = await db.query(query, [cnpj]);
  return result.rowCount > 0;
};

module.exports = {
  createWhatsAppConversation,
  getWhatsAppConversations,
  getWhatsAppConversationByCNPJ,
  updateWhatsAppConversation,
  deleteWhatsAppConversation
};
