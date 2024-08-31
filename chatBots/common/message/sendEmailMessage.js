const sendMessage = require('../../common/service/messageSender');

const sendEmailMessage = async (phoneNumber) => {
  const messageData = {
    type: 'text',
    text: {
      body: '📧 Para agilizar nosso atendimento e garantir que tudo seja resolvido rapidinho, poderia me informar o e-mail cadastrado na empresa? ✉️ Estamos só dando uma conferida no cadastro da sua empresa para oferecer o melhor suporte possível. Agradecemos desde já! 😄✨'
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`E-mail message sent to ${phoneNumber}`);
};

const sendInvalidEmailMessage = async (phoneNumber) => {
  const messageData = {
    messaging_product: 'whatsapp',
    type: 'text',
    text: {
      body: `Ops! 😅 Parece que houve um errinho com o e-mail informado. Pode dar uma olhadinha e enviar novamente o e-mail cadastrado na empresa? ✉️ Vamos acertar isso rapidinho! 🚀`
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Invalid email message sent to ${phoneNumber}`);
};


module.exports = { sendEmailMessage , sendInvalidEmailMessage };
