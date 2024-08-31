const sendMessage = require('../../common/service/messageSender');

// Função para enviar mensagem pedindo o CNPJ
const sendCNPJMessage = async (phoneNumber) => {
  const messageData = {
    type: 'text',
    text: {
      body: '📋 Para adiantar nosso atendimento, por favor informe o CNPJ da empresa cadastrada. 📈✨ Se precisar de ajuda, estou aqui para isso! 😉'
      }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`CNPJ message sent to ${phoneNumber}`);
};

// Função para enviar mensagem indicando que o CNPJ é inválido
const sendInvalidCNPJMessage = async (phoneNumber) => {
  const messageData = {
    type: 'text',
    text: {
      body: `🚨 Oops! Parece que o CNPJ que você enviou está com algum problema e não é válido. 😅 Não se preocupe, vamos corrigir isso! Por favor, confira o CNPJ e envie um válido para continuarmos com o atendimento. 💼🔍 Estou aqui para ajudar, viu? 😃`    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Invalid CNPJ message sent to ${phoneNumber}`);
};

module.exports = {
  sendCNPJMessage,
  sendInvalidCNPJMessage
};
