const axios = require('axios');
require('dotenv').config();

const createTicket = async (contact) => {
  const apiKey = process.env.MILLDESK_API_KEY;
  const title = contact.title;
  const email = contact.email;
  const description = contact.description;
  const additionalInfo = `\r\n\r\nInformações do Contato:\r\n` +
  `Chamado aberto por: ${contact.name}\r\n` +
  `Telefone da Abertura: ${contact.phoneNumber}\r\n` +
  `Local: ${contact.location}\r\n` +
  `Responsável: ${contact.responsavel}\r\n` +
  `Contato Responsável: ${contact.contato_responsavel}`;



  const fullDescription = `${description}${additionalInfo}`;
  
  const url = `https://v1.milldesk.com/api/${apiKey}/addTicket?email=${email}&title=${title}&description=${fullDescription}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
    console.log(url);
  } catch (error) {
    console.error('Erro ao criar ticket na MillDesk:', error);
  }
};

module.exports = {
  createTicket,
};
