const sendMessage = require('../../common/service/messageSender');

// Mensagem para adicionar título ao ticket
const sendAddTitleMessage = async (phoneNumber) => {
  const messageData = {
    messaging_product: 'whatsapp',
    type: 'text',
    text: {
      body: `📝 Vamos deixar seu ticket ainda mais organizado? Que tal adicionar um título para facilitar a nossa vida e garantir que tudo seja resolvido rapidinho? 🚀 Diga um título bacana que descreva o que está acontecendo e estaremos prontos para ajudar! 😄✨`
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Add title message sent to ${phoneNumber}`);
};

// Mensagem de Descrição
const sendDescriptionMessage = async (phoneNumber) => {
  const messageData = { 
    messaging_product: 'whatsapp',
    type: 'text',
    text: {
      body: `✍️ Agora, para que possamos resolver tudo direitinho, descreva seu problema de forma rápida e direta para anexarmos ao seu chamado. 🔍 Se precisar de ajuda, estou por aqui! 😄`
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Description message sent to ${phoneNumber}`);
};

// Mensagem de Confirmação
const sendConfirmationMessage = async (phoneNumber) => {
  const messageData = { 
    messaging_product: 'whatsapp',
    type: 'text',
    text: {
      body: `✔️ Perfeito! Recebi sua descrição. 🎯 Nossa equipe vai analisar e entrar em contato com você o mais breve possível. Se tiver mais alguma dúvida ou precisar de mais alguma coisa, é só chamar. Estou aqui para ajudar! 😃✨`
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Confirmation message sent to ${phoneNumber}`);
};

module.exports = { sendDescriptionMessage, sendConfirmationMessage , sendAddTitleMessage };
