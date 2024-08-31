const sendMessage = require('../../common/service/messageSender');

const sendGreetingMessage = async (contact) => {
  const { name, phoneNumber } = contact;

  const messageData = {
    messaging_product: 'whatsapp',
    type: 'image',
    image: {
      link: 'https://github.com/juliuscxlopes/Wpp-Railways/blob/master/src/assets/Imagem%20do%20WhatsApp%20de%202024-07-24%20%C3%A0(s)%2011.03.31_df30f9c6.jpg?raw=true',
      caption: `🎉 Olá, *${name}*! Seja super bem-vindo ao Ponto Rápido! 🚀 Eu sou a Paty, sua assistente virtual de suporte, e estou aqui para te ajudar com o que precisar! 😄✨`
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Greeting message sent to ${name} at ${phoneNumber}`);
};

module.exports = sendGreetingMessage;






